import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTicketComment } from "../../slices/tickets";

const CreateTicketComment = (props: any) => {
  //   const userAdmin: any = JSON.parse(localStorage.getItem("profile")!);
  const ticket_id = props.ticketId;
  const dispatch = useAppDispatch();
  const userAdmin: any = JSON.parse(localStorage.getItem("profile")!).admin;

  const [commentData, setCommentData] = useState({
    comment: "",
    ticketID: ticket_id,
    userId: userAdmin
  });

  const commentSubmit = (e: any) => {
    e.preventDefault();
    dispatch(createTicketComment(commentData)).then((response: any) => {
      console.log(response);
      if (response.meta.requestStatus === "fulfilled") {
        clear();
      } else {
        alert(response.payload["message"]);
      }
    });
    //cheat way. Need to force the component re-render.
    window.location.reload();
  };

  const clear = () => {
    setCommentData({
      comment: "",
      ticketID: ticket_id,
      userId: userAdmin
    });
  };

  return (
    <>
      <div className="messages__input">
        <h3>Add a comment below</h3>
        <form onSubmit={commentSubmit} className="messages__form">
          <input
            name="comment"
            required
            type="text"
            placeholder="Enter your comment here"
            value={commentData.comment}
            onChange={(event) =>
              setCommentData({ ...commentData, comment: event.target.value })
            }
          ></input>
          <input type="submit" value="Add a comment"></input>
        </form>
      </div>
    </>
  );
};

export default CreateTicketComment;
