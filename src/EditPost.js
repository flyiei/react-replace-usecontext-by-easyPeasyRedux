// import { useState, useEffect, useContext } from "react";
import { useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
// import api from './api/posts'
import { format } from 'date-fns';
// import DataContext from './context/DataContext'
import {useStoreState, useStoreActions} from 'easy-peasy'

// const EditPost = ({
//     posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
// }) => {
const EditPost = () => {   

    const history = useHistory();
    const { id } = useParams();

    // const [editTitle, setEditTitle] = useState('');
    // const [editBody, setEditBody] = useState('');
    // const {posts, setPosts} = useContext(DataContext)
    
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
   
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state)=>state.getPostById);
    const post = getPostById(id);
    // const post = posts.find(post => (post.id).toString() === id);


    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    // const handleEdit = async (id) => {
    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        // try {
        //   const response = await api.put(`/posts/${id}`, updatedPost);
        //   setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
        //   setEditTitle('');
        //   setEditBody('');
        //   history.push('/');
        // } catch (err) {
        //   console.log(`Error: ${err.message}`);
        // }
        editPost(updatedPost)
        history.push(`/post/${id}`)
      }

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        {/* <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button> 
                            //browser console shows wornings if type="submit": Form submission canceled because the form is not connected 
                        */}
                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost
