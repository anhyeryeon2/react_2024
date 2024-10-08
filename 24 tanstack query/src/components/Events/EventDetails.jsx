import { Link, Outlet, useNavigate, useParams} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../Header.jsx";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {mutate, isPending:isPendingDeletion, isError:isErrorDeleting, error:deleteError} = useMutation({
    mutationFn:deleteEvent,
    onSuccess:() => {
      queryClient.invalidateQueries({
        queryKey:['events'],
        refetchType:'none'
      })
      navigate('/events');
    }
  });

  function handleStartDelete(){
    setIsDeleting(true);
  }

  function handleStopDelete(){
    setIsDeleting(false);
  }

  function handleDelete(){
    mutate({id: params.id});
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data... </p>
      </div>
    );
  }
  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message}
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US',{
      day: 'numeric',
      month: 'short',
      year:'numeric',
    })
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    {isDeleting && ( <Modal onClose={handleStopDelete}>
      <h2>확실한가요?</h2>
      <p>이 이벤트를 정말 삭제할 것 인가요? 취소할 수 없습니다. </p>
      <div className="form-actions">
        {isPendingDeletion && <p>삭제중... 기둘기둘...</p>}
        {!isPendingDeletion && (<>
        <button onClick={handleStopDelete} className="button-text">Cancel</button>
        <button onClick={handleDelete}className="button">Delete</button>
        </>)}
        
      </div>
      {isErrorDeleting && (<ErrorBlock title="failed to delete event" message={deleteError.info?.message}/>)}
    </Modal>)}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
