import React, {Component} from 'react';
import  './RandomQuote.css';


class RandomQuote extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            quoteOftheDay : 'Fly High in the Sky!',
            author : 'Saraswathi' ,
            QuotesList: ""         
        }
         //method called when any button clicked on calculator
        this.changeQuote = this.changeQuote.bind(this);

         //method called when any button clicked on calculator
         this.RedirectToTwitter = this.RedirectToTwitter.bind(this);         
         
    }

    componentDidMount() {
        fetch('http://localhost:8080/quotes')
        .then(response => response.json())
        .then(data => {             
            //console.log('yes',data); // Prints result from `response.json()` in getRequest
            this.setState({QuotesList:data});
        })
        .catch(error => console.error(error));   
    }  

    changeQuote = () => {         
        document.documentElement.style.setProperty('--main-bg-color', getRandomColor());
        var randomItem = this.state.QuotesList[Math.floor(Math.random()*this.state.QuotesList.length)];
        this.setState({ quoteOftheDay:randomItem.quote, author:randomItem.author });                
    }

    RedirectToTwitter = (buttonType, e) => { 
        e.preventDefault();
        var texttoPass= this.state.quoteOftheDay + '-'  + this.state.author;
        if(buttonType === 'Twitter') { 
            window.open("https://twitter.com/intent/tweet?text="+ encodeURIComponent(texttoPass) + "&url="+
            "/web/tweet-button", "_blank");               
        }
        else {
            var cannonUrl = encodeURIComponent("https://www.tumblr.com/buttons");
            window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&caption="+ 
            encodeURIComponent(this.state.author)+"&content=" + encodeURIComponent(this.state.quoteOftheDay) +
             "&canonicalUrl=" + cannonUrl,"_blank");
        }         
    }

    

    render() { 
        return(<div className='Quotewrapper'>
        <div className='innerdiv'>
            <BlockQuote quoteOftheDay = {this.state.quoteOftheDay} author = { this.state.author} />
            <div className='btndivs'>
                <div className='left'>
                    <SocialNetworkButton showtext='Twitter'  onClick = { this.RedirectToTwitter }  />
                    <SocialNetworkButton showtext='Tumblr'  onClick = { this.RedirectToTwitter }  />
                  
                </div>               
                <div className='right'>
                    <NextButton onClick = { this.changeQuote } />
                </div>
            </div>   
            
        </div>  
    </div>) };
}




function SocialNetworkButton (props) { 
 return (
    <div><button id={ props.showtext } className='socialbuttons' onClick = { e => { props.onClick(props.showtext, e) } }> 
     
     { props.showtext } 
     </button> 
     </div>
 );
}

const NextButton = ({onClick}) => (
    <div><button id='newquote' className='socialbuttons' onClick = { onClick } >New Quote</button></div>
);


function BlockQuote(props) {
    return (<div className='quote'>
    <blockquote>
        <p id='quote'>"{ props.quoteOftheDay }"</p>
        <footer>-by { props.author }</footer>
    </blockquote>                
</div>);
}


function getRandomColor() {
    var red = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);

    var bgcolor = "rgb(" + red + "," + blue + "," + green + ")";
    return bgcolor;
}
export default RandomQuote;