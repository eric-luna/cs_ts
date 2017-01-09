import React, { Component } from 'react';
import Footer from './footer';
import Nav from './nav';
import './main.css';
import './tv.css';

class TV extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        amount:0,
        count:0,
        poster:"",
        title:"",
        air_date:"",
        overview:"",
        id:"",
        trailer:"",
        toggleContainer:"hide",
        toggleButton:"hide",
        toggleTrailer:"trailer"
      };

      this.handleClickNext = this.handleClickNext.bind(this);
      this.handleClickLast = this.handleClickLast.bind(this);
      this.request = this.request.bind(this);
      this.trailer = this.trailer.bind(this);

      window.addEventListener('keydown', e => this.enter(e));
      window.addEventListener('keydown', e => this.arrow(e));
  }

  request(){
    let tv = this;
    let search = document.getElementById('search').value;
    let xmlhttp = new XMLHttpRequest();
    let url = "http://api.themoviedb.org/3/search/tv?api_key=39124889ea92aada0703109651a543ab&query="+search;

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        tv.setState({count:0});
        let myArr = JSON.parse(this.responseText);
        let poster_path=myArr.results[tv.state.count]['poster_path'];
        let poster = '';
        let title = myArr.results[tv.state.count]['name'];
        let overview = myArr.results[tv.state.count]['overview'];
        let air_date = myArr.results[tv.state.count]['first_air_date'];
        console.log(air_date);

        if(poster_path === null ){
          poster=require('./img/noPoster.jpg');
        }else{
          poster = 'http://image.tmdb.org/t/p/w500/'+poster_path;
        }

        tv.setState({arr:myArr});
        tv.setState({amount:myArr.results.length});
        tv.setState({poster:poster});
        tv.setState({title:title});
        
        if(air_date === ""){
          tv.setState({air_date:"N/A"});
        }else{
          tv.setState({air_date:air_date});
        }

        if (overview === "") {
          tv.setState({overview:"No Description Available"});
        }
        // if overview is over 500 characters cut it short 
        else if (overview.length > 700) {
          let shorter = overview.slice(0,700)+"...";
          tv.setState({overview:shorter});
        }
        // add overview to page
        else {
          tv.setState({overview:myArr.results[tv.state.count]['overview']});
        }
        
        if(tv.state.toggleContainer==='hide'){
          tv.toggleContainer();
        }
        tv.toggleButton();

        // Second Call
        let id = myArr.results[0]["id"];
        let url2 = "http://api.themoviedb.org/3/tv/" + id + "/videos?api_key=39124889ea92aada0703109651a543ab";
        xmlhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
        
            let myArr2 = JSON.parse(this.responseText);

            if(Object.keys(myArr2.results).length === 0){
              if(tv.state.toggleTrailer === 'trailer'){
                tv.toggleTrailer();
              }
            }else{
              if(tv.state.toggleTrailer === 'hide'){
                tv.toggleTrailer();
              }

              let key = myArr2.results[0]["key"];
              let trailer = "https://www.youtube.com/watch?v=" + key;
              tv.setState({trailer:trailer});  
          
            }
          }
        }
        xmlhttp.open("GET", url2, true);
        xmlhttp.send();
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  toggleContainer(){
    let css = (this.state.toggleContainer === "hide") ? "container" : "hide";
    this.setState({toggleContainer:css});
  }

  toggleButton(){
    if(this.state.count === 0){
      this.setState({toggleButton:'hide'});
    }else{
      this.setState({toggleButton:'left-tv action-button animate'});
    }
  }

  toggleTrailer(){
    let css = (this.state.toggleTrailer === "trailer") ? "hide" : "trailer";
    this.setState({toggleTrailer:css});
  }

  handleClickLast(){
    if (this.state.count > 0) {
      this.setState({count:this.state.count-1}, this.append);
    }
    if(this.state.count===0){
      this.toggleButton();
    }
  }

  handleClickNext(){
    if(this.state.count >= this.state.amount-1){
      this.setState({count:0},this.append);
    }else{
      this.setState({count:this.state.count+1},this.append);
    }
  }

  append(){
      this.toggleButton();
      let arr=this.state.arr;
      let count=this.state.count;
      let poster="";
      let poster_path=arr.results[this.state.count]['poster_path'];
      let title = arr.results[this.state.count]['name'];
      let overview = arr.results[this.state.count]['overview'];
      let air_date = arr.results[this.state.count]['first_air_date']; 
      console.log(air_date);

      if(poster_path === null ){
        poster=require('./img/noPoster.jpg');
      }else{
        poster = 'http://image.tmdb.org/t/p/w500/'+poster_path;
      }

      this.setState({poster:poster});
      this.setState({title:title});

      if(air_date == ""){
        this.setState({air_date:"N/A"});
      }else{
        this.setState({air_date:arr.results[this.state.count]['first_air_date']});
      }
      

      if (overview === "") {
        this.setState({overview:"No Description Available"});
      }
      // if overview is over 500 characters cut it short 
      else if (overview.length > 700) {
        let shorter = overview.slice(0,700)+"...";
        this.setState({overview:shorter});
      }
      // add summary to page
      else {
        this.setState({overview:arr.results[this.state.count]['overview']});
      }

      this.setState({id:arr.results[this.state.count]['id']},this.trailer);
  }

  trailer(){
    // Second Call
    let tv = this;
    let xmlhttp = new XMLHttpRequest();
    let id = this.state.id;
    let url2 = "http://api.themoviedb.org/3/tv/" + id + "/videos?api_key=39124889ea92aada0703109651a543ab";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let myArr2 = JSON.parse(this.responseText);

        if(Object.keys(myArr2.results).length === 0){
          if(tv.state.toggleTrailer === 'trailer'){
            tv.toggleTrailer();
          }
        }else{
          if(tv.state.toggleTrailer === 'hide'){
            tv.toggleTrailer();
          }
          let key = myArr2.results[0]["key"];
          let trailer = "https://www.youtube.com/watch?v=" + key;
          tv.setState({trailer:trailer}); 
        }
      }
    }
    xmlhttp.open("GET", url2, true);
    xmlhttp.send();
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
      <section className="tv">
        <Nav class="nav-bar-tv" version="Cinema Seeker" link="/"/>
        <h1 className="header-tv">TV Seeker</h1>
        <div className="search-bar">
           <input id='search' onClick={this.enter} placeholder="Enter a TV Show..."/>
           <button onClick={this.request} className="button-search-tv">Search</button>
        </div>
        <div className={this.state.toggleContainer}>
          <div className="poster">
            <img src={this.state.poster} alt="movie poster"/>
          </div>
          <div className="tv-info">
            <div className="title"><h1>{this.state.title}</h1></div>
            <div className="release_date"><p><b>Release Date:</b> {this.state.air_date}</p></div>
            <div className="overview"><p>{this.state.overview}</p></div>
            <div className={this.state.toggleTrailer}>
              <a href={this.state.trailer}><p className='trailer-button-tv'>View Trailer</p></a>
            </div>
            <div className="navigation">
              <button className={this.state.toggleButton} onClick={this.handleClickLast}>Prev</button>
              <button className='right-tv action-button animate' id='right' onClick={this.handleClickNext}>Next</button>
            </div>
          </div>
        </div>
        <Footer class="footer-tv"/>
      </section>
    );
  }
}

export default TV;
