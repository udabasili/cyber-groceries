import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
    createWorker
} from 'tesseract.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class VerifyAgePage extends Component {
    constructor(props){
        super(props);
        this.state ={
            width: 200,
            height: 200,
            uploadedUrl: '',
            text:'',
            uploadedImage: false,
            isVerifying: false,
            progress: 0
        }
    }

    onImageUpload = () =>{
        const imageInput = document.querySelector('.upload__image')
        const uploadBody = document.querySelector('.upload__body')
        console.log(imageInput)
        
        imageInput.click()
        imageInput.onchange = () =>{
            let fileName = imageInput.value.split("\\")[
                imageInput.value.split("\\").length - 1
            ];
            uploadBody.innerHTML = (`
                <p className='paragraph'>
                    ${fileName}
                </p>
                `
            )
            for (var key in imageInput.files) {
                if (!imageInput.files.hasOwnProperty(key)) continue;
                let upload = imageInput.files[key]
                const url = URL.createObjectURL(upload)
                this.setState((prevState) => ({
                    ...prevState,
                    uploadedUrl: url
                }))
            }

        }
    }
     onImage({target:img}){
        let height = img.naturalHeight
        let width = img.naturalWidth

        this.setState({
            width, 
            height
        })
    }
    verifyAge = async () => {
        this.setState(() => ({
          isVerifying: true,
          text: `Loading`,
        }));
        const worker = createWorker({
            logger: m => {
                if (m.status === 'recognizing text'){
                    console.log(m.progress)
                    this.setState((prevState) =>({
                        progress:  m.progress.toFixed(1)
                    }))
                }
            }
        });
        const image = this.state.uploadedUrl
        
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {
            data: {
                text
            }
        } = await worker.recognize(image);
        console.log(text)
        }
  

  
    static propTypes = {
        prop: PropTypes
    }

    render() {
        const {isVerifying , uploadedUrl, progress , text} = this.state
        return (
          <div className="verify-age">
            <div className="upload">
              <div className="upload__header">
                <FontAwesomeIcon icon={faUpload} size="2x" />
                <h2 className="heading-tertiary"> Upload </h2>
              </div>
              <div className="upload__body" onClick={this.onImageUpload}>
                    <input
                      type="file"
                      hidden={true}
                      name="image"
                      accept="image/*"
                      className="upload__image"
                    />
                    <p className="paragraph">Click here to upload image</p>                
              </div>
            </div>
            <button
              className="btn"
              disabled={!uploadedUrl}
              onClick={this.verifyAge}
            >
              Verify
            </button>
            {isVerifying &&(
                <CircularProgressbar className='progress' value={progress} maxValue={1} text={`${progress * 100}%`} />
            )}
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAgePage)
