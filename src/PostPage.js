import { useParams, Link, useHistory } from "react-router-dom";
// import { useContext } from 'react'
// import api from './api/posts'
// import DataContext from './context/DataContext'
import {useStoreState, useStoreActions} from 'easy-peasy'


// const PostPage = ({ posts, handleDelete }) => {
const PostPage = () => {

    // const {posts, setPosts} = useContext(DataContext);
    const { id } = useParams();
    const history = useHistory();
    const deletePost = useStoreActions((actions)=>actions.deletePost);
    const getPostById = useStoreState((state)=>state.getPostById);
    // const post = posts.find(post => (post.id).toString() === id);
    const post = getPostById(id);

//   const handleDelete = async (id) => { //the 'thunk' from easy-peasy store has the async so we don't need this async from here
    const handleDelete = (id) => {
    // try {
    //   await api.delete(`/posts/${id}`);
    //   const postsList = posts.filter(post => post.id !== id);
    //   setPosts(postsList);
    //   history.push('/');
    // } catch (err) {
    //   console.log(`Error: ${err.message}`);
    // }
    deletePost(id);
    history.push('/');
  }

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
