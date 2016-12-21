var app1 = angular.module('app1',[]);

app1.controller('main',function($scope,$http,$sce){
  var vm = $scope;

  vm.location = "Angular is working!!";
  vm.temperature = "Angular doesn't have a temperature";
  vm.temperatureFar = "America temperature is weird...";
  vm.weather = "Told you Angular doesn't have weather!!";

  var api = "http://api.openweathermap.org/data/2.5/weather?q=";

  var displayFar = true;
 $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK")
        .success(function(data){
          vm.location = data.city;
          vm.country = data.country;
          $http.jsonp(api + vm.location + "," + vm.country + "&units=metric" + "&APPID=061f24cf3cde2f60644a8240302983f2" + "&callback=JSON_CALLBACK")
                .success(function(data){
                  vm.weather = data.weather[0].main;
                  console.log(vm.weather);
                  vm.temperature = Math.round(data.main.temp);
                  vm.temperatureFar = Math.round(vm.temperature * 1.8 + 32);

                  if (vm.weather === "Rain"){
                    $('body').attr('id','rain');
                  }
                  else if(vm.weather === "Clouds"){
                    $('body').attr('id','cloud');
                    $('body').css('color','white');
                  }
                  else if(vm.weather === "Snow"){
                    $('body').attr('id','snow');
                    $('body').css('color','black');
                  }
                  else if(vm.weather === "Sunny"){
                    $('body').attr('id','sun');
                  }
                });
        });

  vm.changeTemp = function(){
    if (displayFar){
      $('#temp').html(vm.temperatureFar +"&#8457;");
      displayFar = false;
    }
    else{
      $('#temp').html(vm.temperature +"&#8451;");
      displayFar = true;
    }
  }
  vm.fetchRandomQuote = function(){
    $http.jsonp(url)
        .success(function(data){
          vm.randomQuote = data[0].content.replace('<p>','').replace('</p>','');
          vm.author = data[0].title;
          $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
          + encodeURIComponent('"' + vm.randomQuote + '" ' + vm.author));
    });
  }
});
