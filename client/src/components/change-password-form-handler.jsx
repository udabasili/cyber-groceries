import {
    useState,
    useEffect
} from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const UseForm = (validator, resetPassword, props) => {
    const history = useHistory()

    const [userInfo, setUserInfo] = useState({})
    const [errors, setErrors] = useState({})
    const [code, setCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const queryString = props.location.search
        if (queryString) {
            const response = queryString.slice(
                queryString.indexOf('Code=') + 5,
                queryString.indexOf('&apiKey')

            )

            setCode(response)
        }
        if (Object.keys(errors).length === 0 && isSubmitting) {
            resetPassword(
                code,
                userInfo.email, 
                userInfo.password, 
                userInfo.confirmPassword)
            .then(()=>{
                history.push('/auth/login')

            })
            
            .catch((err) => {
                toast.error(err)
            });
        }
    }, [errors, 
        isSubmitting, 
        code, 
        history, 
        props.location.search, 
        resetPassword, 
        userInfo.confirmPassword, 
        userInfo.email, 
        userInfo.password]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setErrors(validator(userInfo))
        setIsSubmitting(true)

    }

    const onChangeHandler = (e) => {
        const {
            name,
            value
        } = e.target;
        setUserInfo(currentValue => ({
            ...currentValue,
            [name]: value
        }))

    }

    return {
        userInfo,
        errors,
        onChangeHandler,
        onSubmitHandler,
    }

}

export default UseForm;