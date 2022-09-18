import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
// import { DataProvider } from './context/DataContext';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';


function App() {
  //The useStoreActions hook allows you to access actions 
  //from your components.Importing setPosts from easy-peasy store.
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
      // it will dispatch the setPosts action, providing the 'data' as the payload.
      setPosts(data);
  },[data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog"/>
      {/* <DataProvider>  */}
        <Nav />
        <Switch>
          {/* <Route exact path="/" component={Home} />    */}
          <Route exact path="/">
              <Home isLoading={isLoading} fetchError={fetchError}/>
          </Route>
          <Route exact path="/post" component={NewPost}/>
          <Route path="/edit/:id" component={EditPost}/>
          <Route path="/post/:id" component={PostPage}/>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
        
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;
