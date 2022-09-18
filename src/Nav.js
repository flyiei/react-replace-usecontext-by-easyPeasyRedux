import { Link } from 'react-router-dom';
// import { useContext } from 'react'
// import DataContext from './context/DataContext'
import { useEffect } from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy'
/*
The useStoreState hook allows you to access your store's state.
The useStoreActions hook allows you to access actions from your components.
*/
const Nav = () => {
    // const { search, setSearch } = useContext(DataContext)
    const posts = useStoreState((state)=> state.posts);
    const search = useStoreState((state)=> state.search);
    const setSearch = useStoreActions((state)=> state.setSearch);
    const setSearchResults = useStoreActions((state)=> state.setSearchResults);


    useEffect(() => {
        const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    
        setSearchResults(filteredResults.reverse());
    }, [posts, search, setSearchResults]) //react will complain if we did not put 'setSearchResults' into the dependency array. 
    /*
    If setSearchResults was passed as a prop from a higher component, 
    you'd have to include it in the dependency array because React 
    doesn't know where it comes from. It won't trigger the hook though, 
    so it's safe to do so.
    */

    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
