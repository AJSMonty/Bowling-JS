$(document).ready(function() {
    var thermostat = new Thermostat()
    updateTemperature();

    $('#temperature-up').click(function(){
        thermostat.turnUp();
        updateTemperature();
    });

    $('#temperature-down').click(function(){
        thermostat.turnDown();
        updateTemperature();
    });

    $('#temperature-reset').click(function(){
        thermostat.reset();
        updateTemperature();
    });

    $('#toggle-PSM').click(function(){
        thermostat.togglePowerSavingMode();
        updatePSM();
    });


    function updateTemperature() {
        $("#temperature").text(thermostat.temperature);
        $("#temperature").attr('class', thermostat.usage());
    };

    function updatePSM() {
        $("#power-saving-status").text(thermostat.powerSavingMode);
    };

    function displayCityWeather(city) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
        var token = '&appid=aaa2f2496930e68550ac24de7df431fb';
        var units = '&units=metric';
        $.get(url + token + units, function( weather ) {
            let celsius = Math.trunc(weather.main.temp);
            $('#current-outside-temperature').text(celsius);
            $('#current-weather').text(weather.weather[0].description);
        });
    };

    displayCityWeather('London');

    $('#select-city').submit(function(event) {
        event.preventDefault();
        var city = $('#current-city').val();
        displayCityWeather(city);
    });

});