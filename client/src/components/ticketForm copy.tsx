import React, { useEffect, useState, CSSProperties } from 'react';
import { WebsiteMargin } from '../styled/styled';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import validator from 'validator';

const TicketForm = () => {
    //initialise the useNavigate feature from react-router-dom
    const navigate = useNavigate();
    //grab the users info from local storage
    const user:any = JSON.parse(localStorage.getItem('profile')!);
    //create the state for the ticket data and setter function
    const [ ticketData, setTicketData ] = useState({
        title: '',
        discipline: '', 
        message: '',
        website: '',
        ticketImages: [],
    });

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (formValidation() === true) {
            await axios.post('http://localhost:8000/api/new_ticket_form.php', {
                //send data to the db with the users id so that we can query specific tickets later
                userId: user.id,        
                title: ticketData.title,
                discipline: ticketData.discipline,
                message: ticketData.message,
                website: ticketData.website,
                // ticketImages: ticketData.ticketImages,
                }).then(function (response) {
                    console.log(response.data);
                    //check the http response from the server and alert user based on it
                    if (response.data === 200) {
                        alert("Success! Your ticket has been posted.")
                    } else {
                        alert("Oops, something has gone wrong and your ticket may not have been submitted.")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                await axios.post('http://localhost:8000/api/s3.php', ticketData.ticketImages)
                    .then(function (response) {
                        console.log(response);
                        //check the http response from the server and alert user based on it
                        if (response.status === 200) {
                            alert("Success! Your images have been uploaded.")
                        } else {
                            alert("Oops, something has gone wrong and your images may not have been uploaded.")
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
        }
        clear();
    };

    //function to clear state once form is submitted
    const clear = () => {
        setTicketData({ title: '', discipline: '', message: '', ticketImages: [], website: '' });
    };

    //handle file uploading so that users can attach images and screenshots of potential issues
    const multiImageUpload = async (imageList:any, addUpdateIndex:any) => {
        // console.log(imageList, addUpdateIndex);
        setTicketData({ ...ticketData, ticketImages: imageList });
    };

    //frontend validation to prevent data from being sent to server that is incorrect
    const formValidation = () => {
        //using validator library to help check data 
        if (!validator.isURL(ticketData.website)) {
            alert("Please enter a valid website URL.")
            return false;
        } else if ((validator.isEmpty(ticketData.website)) || (validator.isEmpty(ticketData.title)) || (validator.isEmpty(ticketData.message))  ) {
            alert("You cannot have an empty field.")
            return false;
        } else {
            return true;
        }
    }

    const isDraggingCSS: CSSProperties = {
        color: 'red',
    }

    const isNotDraggingCSS: CSSProperties = {
    }

    return (
        <WebsiteMargin>
        <div>
            <form onSubmit={handleSubmit} className="ticketform">
                <input name="title" required type="text" placeholder="Ticket title" value={ticketData.title} onChange={(event) => setTicketData({ ...ticketData, title: event.target.value })}></input>
                <select name="discipline" required value={ticketData.discipline} placeholder="Please choose a discipline" onChange={(event) => setTicketData({ ...ticketData, discipline: event.target.value })}>
                        <option selected disabled value="">Please choose a discipline</option>
                        <option value="Website Issues">Website Issues</option>
                        <option value="Marketing Questions">Marketing Questions</option>
                        <option value="Email Issues">Email Issues</option>
                        <option value="Other">Other</option>
                    </select>
                <input name="website" required type="text" placeholder="Your website URL" value={ticketData.website} onChange={(event) => setTicketData({ ...ticketData, website: event.target.value })}></input>
                <textarea name="message" required placeholder="Your message" value={ticketData.message} onChange={(event) => setTicketData({ ...ticketData, message: event.target.value })}></textarea>
                <p>Please upload any relevant screenshots below:</p>
                <ImageUploading
                        multiple={true}
                        value={ticketData.ticketImages}
                        onChange={multiImageUpload}
                        maxNumber={3}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                        }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <button
                            style={isDragging ? isDraggingCSS : isNotDraggingCSS}
                            onClick={onImageUpload}
                            {...dragProps}
                            type="button"
                            >
                            Click or Drop here
                            </button>
                            &nbsp;
                            <button type="button" onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <button type="button" onClick={() => onImageUpdate(index)}>Update</button>
                                <button type="button" onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </ImageUploading>
                <button type="submit">Submit</button>
            </form>
        </div>
        </WebsiteMargin>
    )
};

export default TicketForm;