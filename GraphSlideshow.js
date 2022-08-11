

// START MOVING GRAPH SLIDES STUFF

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// END MOVING GRAPH SLIDES STUFF

init().then(() => {

    if (TeamData != null) {

        console.log(TeamData);

        // START GRAPH DISPLAY STUFF

        var selectedTeam = "5419";

        let autoHighSuccess = {};
        let autoLowSuccess = {};
        let autoFail = {};

        let teleHighSuccess = {};
        let teleLowSuccess = {};
        let teleFail = {};

        let climbAttempted = {};
        let climbActual = {};

        for (var i = 0; i < TeamData.length; i++) {
            if (TeamData[i].number == selectedTeam) {
                for (var j = 0; j < TeamData[i].matches.length; j++) {
                    autoHighSuccess[TeamData[i].matches[j].number] = TeamData[i].matches[j].aHigh;
                    autoLowSuccess[TeamData[i].matches[j].number] = TeamData[i].matches[j].aLow;
                    autoFail[TeamData[i].matches[j].number] = TeamData[i].matches[j].aFail;
                    teleHighSuccess[TeamData[i].matches[j].number] = TeamData[i].matches[j].tHigh;
                    teleLowSuccess[TeamData[i].matches[j].number] = TeamData[i].matches[j].tLow;
                    teleFail[TeamData[i].matches[j].number] = TeamData[i].matches[j].tFail;
                    climbAttempted[TeamData[i].matches[j].number] = TeamData[i].matches[j].climbAttempted;
                    climbActual[TeamData[i].matches[j].number] = TeamData[i].matches[j].climbActual;
                }
            } 
        }

        console.log(autoHighSuccess);

        backgroundColors = ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'];

        borderColors = [ 'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
        ];

        const teleop = {
            
            labels: Object.keys(teleHighSuccess),
            datasets: [
            {
                label: 'Teleop High',
                data: Object.values(teleHighSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Teleop Low',
                data: Object.values(teleLowSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Teleop Fail',
                data: Object.values(teleFail),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            }
                
        ]};

        const auto = {
            
            labels: Object.keys(autoHighSuccess),
            datasets: [
            {
                label: 'Auto High',
                data: Object.values(autoHighSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Auto Low',
                data: Object.values(autoLowSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Auto Fail',
                data: Object.values(autoFail),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            }
                
        ]};

        const traversal = {
            
            labels: Object.keys(autoHighSuccess),
            datasets: [
            {
                label: 'Auto High',
                data: Object.values(autoHighSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Auto Low',
                data: Object.values(autoLowSuccess),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Auto Fail',
                data: Object.values(autoFail),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            }
                
        ]};

        
        const ctx1 = document.getElementById('teleopGraph').getContext('2d');
        const teleopGraph = new Chart(ctx1, {
            type: 'line',
            data: teleop,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
            },
        });

        const ctx2 = document.getElementById('autoGraph').getContext('2d');
        const autoGraph = new Chart(ctx2, {
            type: 'line',
            data: auto,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
            },
        });

        const ctx3 = document.getElementById('traversalGraph').getContext('2d');
        const traversalGraph = new Chart(ctx3, {
            type: 'line',
            data: traversal,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
            },
        });
        
    }

    //END GRAPH DISPLAY STUFF

            
});