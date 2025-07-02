/*
    youtube-embed.js - JavaScript for Lazy Loading YouTube Embeds

    This script converts static YouTube embed placeholders into dynamic
    iframes that only load the full YouTube player when clicked.
    This improves page load performance by deferring the loading of
    heavy iframe resources until they are explicitly requested by the user.

    How to use:
    1.  In your HTML (e.g., index.html, videos.html), replace your <iframe> tags
        with a <div> element structured like this:
        <div class="youtube-player" data-video-id="VIDEO_ID_HERE"></div>

    2.  Ensure this script is linked in your HTML file:
        <script src="assets/js/youtube-embed.js"></script>

    3.  Add the necessary CSS (provided below) to your style.css or responsive.css
        to style the placeholder and play button.
*/

document.addEventListener('DOMContentLoaded', function() {

    // Select all elements that are designated as YouTube players
    const youtubePlayers = document.querySelectorAll('.youtube-player');

    youtubePlayers.forEach(player => {
        // Get the video ID from the data-video-id attribute
        const videoId = player.dataset.videoId;

        if (videoId) {
            // Create the thumbnail image
            // YouTube provides high-quality thumbnails based on video ID
            const thumbnail = new Image();
            thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // hqdefault.jpg is a common high-quality thumbnail
            thumbnail.alt = 'YouTube Video Thumbnail';
            thumbnail.classList.add('youtube-thumbnail');

            // Create the play button overlay (using FontAwesome icon)
            const playButton = document.createElement('div');
            playButton.classList.add('youtube-play-button');
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // FontAwesome play icon

            // Append the thumbnail and play button to the player div
            player.appendChild(thumbnail);
            player.appendChild(playButton);

            // Add click listener to the player div
            player.addEventListener('click', function() {
                // When clicked, remove the thumbnail and play button
                player.innerHTML = '';

                // Create the YouTube iframe
                // The src uses YouTube's embed URL and enables autoplay
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('title', `YouTube video player for ID ${videoId}`); // Improve accessibility
                iframe.classList.add('youtube-iframe'); // Add a class for styling

                // Append the iframe to the player div
                player.appendChild(iframe);

                // Set focus to the iframe for better accessibility once loaded
                iframe.focus();
            });
        } else {
            console.warn('YouTube player found without data-video-id attribute:', player);
        }
    });
});
