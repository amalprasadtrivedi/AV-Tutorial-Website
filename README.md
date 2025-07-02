# 📚 AV Tutorial Website

![AV Tutorial Logo](assets/img/logo.png)

Welcome to the official repository for the **AV Tutorial** website! This project provides a comprehensive online presence for AV Tutorial, a coaching center specializing in Mathematics, Physics, Chemistry, and Biology for school students (Classes 9-12) and aspirants for competitive exams like NDA, CDS, AFCAT, and CSAT.

The website is designed to be informative, user-friendly, and fully responsive, ensuring a seamless experience across all devices.

## ✨ Features

* **Homepage:** Engaging introduction to AV Tutorial, highlighting core offerings, featured teachers, and testimonials.
* **About Us:** Detailed information about the coaching center's philosophy, mission, and values.
* **Teachers:** Dedicated profiles for expert educators, Virendra Prasad Trivedi Sir and Vishal Verma Sir.
* **Courses:** Comprehensive overview and detailed pages for each course offered (Class 9-12, NDA, CDS, AFCAT, CSAT).
* **Video Lectures:** Integration with the "Kalindri Gyan - Mathematics By Trivedi Sir" YouTube channel for free video tutorials with lazy loading for performance.
* **Testimonials:** Showcase success stories and positive feedback from students.
* **Gallery:** Photo gallery displaying infrastructure, classrooms, and student life.
* **Blog:** A platform for educational articles, exam strategies, and news, with individual post templates.
* **FAQ:** Frequently Asked Questions section with an interactive accordion design.
* **Contact Us:** An inquiry form with client-side validation and serverless function integration for email notifications.
* **Custom 404 Page:** User-friendly error page for missing content.
* **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
* **WhatsApp Chat Button:** Easy access for direct communication.

## 🚀 Technologies Used

* **HTML5:** Structure and content of the web pages.
* **CSS3:** Styling and layout, including responsive design.
    * `base.css`: CSS reset, basic typography, and common utilities.
    * `components.css`: Styles for reusable UI components (buttons, cards).
    * `style.css`: Main layout, theme, and specific section styling.
    * `responsive.css`: Media queries for mobile responsiveness.
* **JavaScript (Vanilla JS):**
    * `script.js`: General interactions, mobile navigation toggle.
    * `form-validation.js`: Client-side form validation and asynchronous submission to serverless function.
    * `carousel.js` (Optional): Basic carousel functionality for testimonials.
    * `youtube-embed.js` (Optional): Lazy loading for YouTube video embeds.
* **FontAwesome:** For various icons used throughout the website.
* **Vercel:** Hosting platform for frontend and serverless functions.
* **Node.js (for Serverless Function):** Backend logic for sending emails via the contact form.
* **Nodemailer:** Node.js library for sending emails from the serverless function.

## 💻 Setup and Deployment

Follow these steps to set up the project locally and deploy it to Vercel.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/amal-prasad-trivedi/av-tutorial-website.git](https://github.com/amal-prasad-trivedi/av-tutorial-website.git)
    cd av-tutorial-website
    ```
2.  **Install Node.js dependencies (for serverless function):**
    ```bash
    npm install
    ```
    This will install `nodemailer` and any other dependencies listed in `package.json`.
3.  **Fill in Placeholders:**
    * Update all `[Your Coaching Center's Full Address Here]`, `+91 XXXXXXXXXX`, `info@avtutorial.com`, `[Start Time]`, `[End Time]`, `[Days of Week]` with your actual details in all HTML files.
    * Replace `YOUR_GOOGLE_MAPS_EMBED_URL` in `contact.html` with your actual Google Maps embed URL.
    * Replace `VIDEO_ID_1`, `VIDEO_ID_2`, etc., in `index.html` and `videos.html` with actual YouTube video IDs.
    * Add your own images to `assets/img/` (e.g., `logo.png`, `hero-bg.jpg`, `virendra-prasad-trivedi.jpg`, `vishal-verma.jpg`, `students/`, `classrooms/`, `blog/`, `404-illustration.png`).
    * For blog posts (`blog/*.html`), update `[Blog Post Title]`, `[Author Name]`, `[Date of Post]`, `[Category]`, `[Blog Post Description]`, `[Keyword1]`, `[Keyword2]`, `[Subject]`, and image paths.
4.  **Open in Browser:** You can open `index.html` directly in your browser to view the static website.

### Vercel Deployment (for Contact Form Functionality)

To make the contact form functional (i.e., send emails), you'll deploy the site to Vercel, leveraging its Serverless Functions.

1.  **Create `api/contact.js`:**
    Ensure you have the `api/contact.js` file in your project root, as provided in the previous conversation.
    * **Crucially, replace `'YOUR_RECEIVING_EMAIL@example.com'` in `api/contact.js` with the email address where you want to receive messages.**
2.  **Set Environment Variables in Vercel:**
    For security, your email sending credentials must be stored as environment variables in Vercel, not directly in `api/contact.js`.
    * Go to your Vercel Project Dashboard.
    * Navigate to **Settings > Environment Variables**.
    * Add the following variables (replace values with your actual SMTP details):
        * `SMTP_HOST`: (e.g., `smtp.gmail.com`, `smtp-relay.sendgrid.net`)
        * `SMTP_PORT`: (e.g., `587` for TLS, `465` for SSL)
        * `SMTP_USER`: (Your email address used for sending, e.g., `your_sending_email@example.com`)
        * `SMTP_PASS`: (Your email password or **App Password/API Key** - **Highly recommended for Gmail/Outlook!**)
3.  **Deploy:**
    * Connect your project to a Git repository (GitHub, GitLab, Bitbucket).
    * Import your repository into Vercel.
    * Vercel will automatically detect the static files and the Node.js serverless function in the `api` directory and deploy them.

## 📂 Project Structure

```

├── api/
│   └── contact.js              # Vercel Serverless Function for contact form
├── assets/
│   ├── css/
│   │   ├── base.css            # Basic styles & reset
│   │   ├── components.css      # Reusable UI component styles
│   │   ├── responsive.css      # Media queries for responsiveness
│   │   └── style.css           # Main website styling
│   ├── img/                    # Images (logo, hero, teachers, students, blog, 404)
│   │   ├── blog/
│   │   ├── classrooms/
│   │   ├── icons/
│   │   ├── students/
│   │   └── teachers/
│   │   └── ...
│   └── js/
│       ├── carousel.js         # Optional: Carousel functionality
│       ├── form-validation.js  # Client-side form validation & submission
│       ├── script.js           # Main JS (e.g., mobile nav toggle)
│       └── youtube-embed.js    # Optional: Lazy load YouTube embeds
├── blog/
│   ├── index.html              # Blog listing page
│   ├── demystifying-organic-chemistry.html # Example blog post
│   ├── latest-tips-for-maths.html # Example blog post
│   └── nda-exam-strategy.html  # Example blog post
├── classes/
│   ├── class9.html             # Class 9 course details
│   ├── class10.html            # Class 10 course details
│   ├── class11.html            # Class 11 course details
│   └── class12.html            # Class 12 course details
├── competitive-exams/
│   ├── afcat.html              # AFCAT course details
│   ├── cds.html                # CDS course details
│   ├── csat.html               # CSAT course details
│   └── nda.html                # NDA course details
├── .gitignore                  # Specifies intentionally untracked files
├── 404.html                    # Custom 404 error page
├── about.html                  # About Us page
├── contact.html                # Contact & Enquiry Form page
├── courses.html                # General Courses overview page
├── faq.html                    # FAQ page
├── gallery.html                # Gallery page
├── index.html                  # Homepage
├── package.json                # Node.js project metadata & dependencies
├── testimonials.html           # Testimonials/Success Stories page
└── videos.html                 # Dedicated page for YouTube channel integration

```

## 🤝 Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.

## 📧 Contact

For any inquiries or support, please reach out to us:

* **Email:** `amaltrivedi3904stella@gmail.com` 
* **WhatsApp:** `+91 7080315492`
* **Website:** [Your Vercel Deployment URL Here]

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (if you create one).
