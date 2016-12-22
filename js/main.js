var app1 = angular.module('app1',[]);

app1.controller('main',function($scope,$http,$sce){
  var vm = $scope;

  vm.location = "Angular is working!!";
  vm.temperature = "Angular doesn't have a temperature";
  vm.temperatureFar = "America temperature is weird...";
  vm.weather = "Told you Angular doesn't have weather!!";

  var api = "http://api.openweathermap.org/data/2.5/weather?q=";

  var displayFahrenheit = true;
  $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK")
        .success(function(data){
          vm.location = data.city;
          vm.country = data.country;
          $http.jsonp(api + vm.location + "," + vm.country + "&units=metric" + "&APPID=061f24cf3cde2f60644a8240302983f2" + "&callback=JSON_CALLBACK")
                .success(function(data){
                  vm.weather = data.weather[0].main;
                  vm.temperature = Math.round(data.main.temp);
                  vm.temperatureFar = Math.round(vm.temperature * 1.8 + 32);
                  changeBackgroundImage(vm.weather);
                });
        });

  function changeBackgroundImage(apiWeather){
    var weather = apiWeather.toLowerCase();
    switch(weather){
      case 'rain' || 'drizzle' || 'thunderstom':
        addWeatherElements("rain","white");
        break;
      case 'clouds':
        addWeatherElements("cloud","white");
        break;
      case 'snow':
        addWeatherElements("snow","black");
        break;
      case 'clear':
        addWeatherElements("sun","black");
        break;
    }
  }

  function addWeatherElements(weather, color){
    $('body').attr('id',weather);
    $('body').css('color',color);
  }

  vm.updateTemperatureView = function(){
    if (displayFahrenheit){
      $('#temp').html(vm.temperatureFar +"&#8457;");
      displayFahrenheit = false;
    }
    else{
      $('#temp').html(vm.temperature +"&#8451;");
      displayFahrenheit = true;
    }
  };
});
