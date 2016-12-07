import React, { Component } from 'react';
import Footer from './footer';
import Nav from './nav';

class Movie extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        amount:"",
        count:"",
        poster:"",
        title:"",
        release_date:"",
        overview:"",
        trailer:"",
        toggle:"hide",
        toggle2:"hide"
      };

      this.request = this.request.bind(this);
      this.handleClickNext = this.handleClickNext.bind(this);
      this.handleClickLast = this.handleClickLast.bind(this);

      window.addEventListener('keydown', e => this.enter(e));
      window.addEventListener('keydown', e => this.arrow(e));
  }

  request(){
    let movie = this;
    let search = document.getElementById('search').value;
    let xmlhttp = new XMLHttpRequest();
    let url = "http://api.themoviedb.org/3/search/movie?api_key=39124889ea92aada0703109651a543ab&query="+search;

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        movie.setState({count:0});
        let myArr = JSON.parse(this.responseText);
        let poster_path=myArr.results[movie.state.count]['poster_path'];
        let poster = 'http://image.tmdb.org/t/p/w500/'+poster_path;
        movie.setState({arr:myArr});
        movie.setState({amount:myArr.results.length});
        movie.setState({poster:poster});
        movie.setState({title:myArr.results[movie.state.count]['title']});
        movie.setState({release_date:myArr.results[movie.state.count]['release_date']});
        movie.setState({overview:myArr.results[movie.state.count]['overview']});
        if(movie.state.toggle==='hide'){
          movie.toggle();
        }
        movie.toggle2();

        // Second Call
        let id = myArr.results[0]["id"];
        let url2 = "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=39124889ea92aada0703109651a543ab";
        xmlhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            let myArr2 = JSON.parse(this.responseText);
            let key = myArr2.results[movie.state.count]["key"];
            let trailer = "https://www.youtube.com/watch?v=" + key;
            movie.setState({trailer:{trailer}});
          }
        }
        xmlhttp.open("GET", url2, true);
        xmlhttp.send();
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  toggle(){
    let css = (this.state.toggle === "hide") ? "movie" : "hide";
    this.setState({toggle:css});
  }

  toggle2(){
    if(this.state.count === 0){
      this.setState({toggle2:'hide'});
    }else{
      this.setState({toggle2:'left action-button animate'});
    }
  }

  handleClickLast(){
    if (this.state.count > 0) {
      this.setState({count:this.state.count-1});
      this.append();
    }
    if(this.state.count===0){
      this.toggle2();
    }
  }

  handleClickNext(){
    this.setState({count:this.state.count+1});
    this.append();
    this.toggle2();
  }

  append(){
      // restarts the movie list if on the last movie of list
      if (this.state.count >= this.state.amount) {
        this.setState({count:0});
        this.append();
        this.toggle2();
      }
      let arr=this.state.arr;
      let count=this.state.count;
      let poster="";
      let poster_path=arr.results[this.state.count]['poster_path'];
      if(poster_path === null ){
        poster=require('./img/noPoster.jpg');
      }else{
        poster = 'http://image.tmdb.org/t/p/w500/'+poster_path;
      }
      this.setState({poster:poster});
      this.setState({title:arr.results[this.state.count]['title']});
      this.setState({release_date:arr.results[this.state.count]['release_date']});
      this.setState({overview:arr.results[this.state.count]['overview']});
  }

  arrow(event){
      if(event.keyCode == 37){
        event.preventDefault();
            this.handleClickLast();
         }

         if(event.keyCode == 39){
        event.preventDefault();
            this.handleClickNext();
         }
    }

  enter(event){
      if(event.keyCode == 13){
          event.preventDefault();
          this.request();
        }
    }

  render() {
    return (
      <section>
        <Nav/>
        <h1 className="header">Cinema Seeker</h1>
        <div className="search-bar">
           <input id='search' onClick={this.enter}/>
           <button onClick={this.request} className="button">Search</button>
        </div>
        <div className={this.state.toggle}>
          <div className="poster">
            <img src={this.state.poster} alt="movie poster"/>
          </div>
          <div className="movie-info">
            <div className="title" id="#"><h1>{this.state.title}</h1></div>
            <div className="release_date"><p>Release Date: {this.state.release_date}</p></div>
            <div className="overview"><p>{this.state.overview}</p></div>
            <div className="trailer">
              <a href={this.state.trailer}><p className='trailer-button'>Click For Trailer</p></a>
            </div>
            <div className="navigation">
              <button className={this.state.toggle2} onClick={this.handleClickLast}>Prev</button>
              <button className='right action-button animate ' onClick={this.handleClickNext}>Next</button>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Movie;
