import React, { useEffect, useState, CSSProperties } from 'react';
import { WebsiteMargin } from '../styled/styled';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import ticketFormValidation from '../validations/ticketForm';

import { useSelector } from 'react-redux';
import { createTicket } from '../slices/tickets';
import { useAppDispatch, useAppSelector } from '../store';

const TicketForm = () => {
    const dispatch = useAppDispatch();
    //initialise the useNavigate feature from react-router-dom
    const navigate = useNavigate();
    //grab the users info from local storage
    const userId:any = JSON.parse(localStorage.getItem('profile')!).id;
    // console.log(userId);
    //create the state for the ticket data and setter function
    const [ ticketData, setTicketData ] = useState({
        title: '',
        discipline: '', 
        message: '',
        website: '',
        ticketImages: [],
        userId: userId,
    });

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (ticketFormValidation(ticketData) === true) {
            dispatch(createTicket(ticketData)).then(response => {
                // console.log(response);
            }).catch(error => {
                console.log(error);
            });
            await axios.post('http://localhost:8000/api/s3.php', ticketData.ticketImages)
                .then(response => {
                    console.log(response);
                    //check the http response from the server and alert user based on it
                    if (response.status === 200) {
                            console.log("Success! Your images have been uploaded.")
                        } else {
                            alert("Oops, something has gone wrong and your images may not have been uploaded.");
                        }
                }).catch(error => {
                    console.log(error);
                    if (error) {
                        return;
                    }
                });
        }
        alert("Your ticket has been created!");
        clear();
    };

    //function to clear state once form is submitted
    const clear = () => {
        setTicketData({ title: '', discipline: '', message: '', ticketImages: [], website: '', userId: userId });
    };

    //handle file uploading so that users can attach images and screenshots of potential issues
    const multiImageUpload = async (imageList:any, addUpdateIndex:any) => {
        // console.log(imageList, addUpdateIndex);
        setTicketData({ ...ticketData, ticketImages: imageList });
    };

    const isDraggingCSS: CSSProperties = {
        color: 'red',
    }

    const isNotDraggingCSS: CSSProperties = {
    }

    return (
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
    )
};

export default TicketForm;