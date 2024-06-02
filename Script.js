document.getElementById('getLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

document.getElementById('bgColorSelect').addEventListener('change', (event) => {
    document.body.style.backgroundColor = event.target.value;
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    document.getElementById('latitude').textContent = `Latitude: ${latitude}`;
    document.getElementById('longitude').textContent = `Longitude: ${longitude}`;
    document.getElementById('accuracy').textContent = `Accuracy: ${accuracy} meters`;

    // Map URL (note: will not work offline)
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    const mapFrame = document.createElement('iframe');
    mapFrame.src = mapUrl;
    mapFrame.style.border = "0";
    mapFrame.width = "100%";
    mapFrame.height = "100%";

    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = '';
    mapDiv.appendChild(mapFrame);
    mapDiv.style.display = 'block';
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
