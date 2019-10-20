import React from 'react'
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "6ed8ce05dc8fad481aa5c9a061d08054"

class App extends React.Component{
  state ={
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }


getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${API_KEY}`);
  const data = await api_call.json();
  
  if(city && country){
    console.log(data);
  this.setState({
    temperature: data.list[0].main.temp,
    city: data.city.name,
    country: data.city.country,
    humidity: data.list[0].main.humidity,
    description: data.list[0].weather[0].description,
    error: ""   
    
  })
  }else{
    this.setState({
      temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: "Please Enter City and Country"
    })
  }
}


  render(){
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Title/>
                </div>
                <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather
                 
                  temperature={Math.floor(this.state.temperature - 273)}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


      

export default App