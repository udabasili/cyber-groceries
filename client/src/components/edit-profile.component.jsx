import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUserProfile } from '../redux/actions/admin.action';
import Loading from './loading.componet';



/**
 *
 * Class representing editing form
 for users profile in admin
 * @class EditProfile
 * @extends {Component}
 */
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: window.innerWidth <= 600,
            isLoading:false,
            data: {
                username: '',
                name: '',
                userId:'',
                ageVerified: false
            },
        }

    }
    componentDidMount() {
		window.addEventListener('resize', this.setIsMobile)
		const {userData} = this.props;
			if (this.props.userData){
				this.setState((prevState) =>({
					...prevState,
					data:{
						username: userData.username,
						name: userData.name,
			userId: userData.userId,
			ageVerified: userData.ageVerified
					}
			}))
		}
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setIsMobile)
    }

    /**
     * Changes state as user types based in the login component tag name and value 
     * @param {*} e 
     */


    setIsMobile = () => {
        this.setState((prevState) => ({
            ...prevState,
            isMobile: window.innerWidth <= 600
        }))
    }



    /**
     * Changes state as user types based in the register component tag name and value 
     * @param {*} e 
    */
    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) =>({
          ...prevState,
          data: {
            ...prevState.data,
            [name]: value

          }
		}))

    
    }

    /**
     * Submits either through the login link or the register link 
     * based on the current auth state value
     * @param {*} e 
     */
    onSubmitHandler = (e) => {
		this.setState((prevState) =>({
			...prevState,
			isLoading: true
		}))
		e.preventDefault()
			const {editUserProfile, onToastMessage, userData, onClose } = this.props
			editUserProfile(this.state.data, userData._id)
				.then((result) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
						}
					))
					onToastMessage('success', 'Profile Successfully edited')
					onClose()
				})
				.catch((err) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					onToastMessage('error', 'Something Went wrong. Try again later')

			});
      
    }



    render() {
        const { data, isMobile , isLoading} = this.state;
        return (
          <div className="edit-profile">
              {isLoading && <Loading/>}
              <form className="form" onSubmit={this.onSubmitHandler}>
                  <div className="form__inner">
                    <div className="form__component">
                     
                      <div className="form__group">
                        <input
                          type="text"
                          name="username"
                          placeholder={isMobile ? "Username" : ""}
                          onChange={this.onChangeHandler}
                          value={data.username}
                          className="form__input"
                          required
                        />
                        <label htmlFor="username" className="form__label">
                          Username
                        </label>
                      </div>
                    </div>
                    <div className="form__component">
                      
                      <div className="form__group">
                        <input
                          type="text"
                          name="name"
                          placeholder={isMobile ? "Name" : ""}
                          onChange={this.onChangeHandler}
                          value={data.name}
                          className="form__input"
                          required
                        />
                        <label htmlFor="name" className="form__label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className='form__component'>
						<div className="form__group">

                    <div className="form__select">
                    <select
                      className="card__select"
                      name = "ageVerified"
                      value={data.ageVerified}
                      id="ageVerified"
                      onChange={this.onChangeHandler}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                    <label htmlFor="ageVerified" className="form__label">
                      Age Verified
                    </label>
                    </div>
                  </div>
                  </div>
                  </div>
                <input
                  type="submit"
                  className="btn"
                  value="Submit"
                />
              </form>
            </div>
          
        );
    }
}

const mapStateToProp = state => ({
    error: state.error.error
})

const mapDispatchToProp = {
    editUserProfile
}

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(EditProfile))