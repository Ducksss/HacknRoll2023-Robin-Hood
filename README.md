<br />
<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors](https://img.shields.io/github/contributors/Ducksss/HacknRoll2023-Robin-Hood.svg)][contributors-url]
[![Forks](https://img.shields.io/github/forks/Ducksss/HacknRoll2023-Robin-Hood.svg)][forks-url]
[![Stargazers](https://img.shields.io/github/stars/Ducksss/HacknRoll2023-Robin-Hood.svg)][stars-url]
[![MIT License](https://img.shields.io/github/license/Ducksss/HacknRoll2023-Robin-Hood.svg)][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Ducksss/HacknRoll2023-Robin-Hood">
    <img src="assets/robin-hood-bg.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Robin Hood</h3>

  <p align="center">
    Catch Me If You Can
    <br />
    <br />
    <a href="#browser-extension">Browser Extension</a>
    ·
    <a href="#fastapi-backend">Fast API Backend</a>
    .
    <a href="https://github.com/Ducksss/HacknRoll2023-Robin-Hood/issues">Report Bugs</a>
    ·
    <a href="https://github.com/Ducksss/HacknRoll2023-Robin-Hood/issues">Request Features</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About The Project](#about-the-project)
- [Built-With](#built-with)
- [High Level Architecture](#high-level-architecture)
- [Getting Started](#getting-started)
- [Browser Extension](#browser-extension)
- [FastAPI Backend](#fastapi-backend)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [References](#references)

<!-- ABOUT THE PROJECT -->

## About The Project

<a href="#about-the-project"></a>

<!-- <a href="https://Robin-Hood-c9549.web.app/"><img src="assets/demo_web.gif" alt="demo_web.gif"></a>
<a href="https://github.com/Ducksss/HacknRoll2023-Robin-Hood/blob/main/README.md#browser-extension"><img src="assets/demo_ext.gif" alt="demo_ext.gif"></a> -->

![](https://github.com/Ducksss/HacknRoll2023-Robin-Hood/blob/main/frontend/src/assets/img/promotional-material.png)

Introducing RobinHood - the ultimate hack for all your GPT-generated text woes. This bad boy uses cutting-edge GPT model to automatically detect and rephrase any GPT-generated text on Notion. But wait, there's more - you also have the power to tweak the intent, context, and styling of the write-up, making it virtually impossible for anyone to catch you using GPT on your assignments. Say goodbye to the fear of getting caught and hello to effortless, top-notch writing with RobinHood.

### Our Project Mission Goals And Values

Our team goal is to democratize AI tools by developing and launching RobinHood, the ultimate hack for all GPT-generated text woes, using cutting-edge GPT technology to automatically detect and rephrase any GPT-generated text on Notion, while also giving users the power to tweak intent, context, and styling for virtually undetectable GPT use in assignments. With this tool, we aim to empower students and academia with effortless, top-notch writing capabilities, and to help them overcome the fear of getting caught using GPT, making advanced AI tools accessible to all.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

<a href="#built-with"></a>

- [TypeScript](https://www.typescriptlang.org/)
- [React 18](https://reactjs.org/)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Vite](https://vitejs.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [SASS](https://sass-lang.com/)
- [Notion](https://notion.so)
- [FastAPI](https://fastapi.tiangolo.com/)
- [NLTK](https://www.nltk.org/)
- [Huggingface 🤗](https://huggingface.co/)
- [GPT-2](https://github.com/openai/gpt-2)
- [OpenAI API](https://openai.com/api/)

<p align="right">(<a href="#top">back to top</a>)</p>

### High Level Architecture

<a href="#built-with"></a>

```mermaid
sequenceDiagram
Web Extension FE->>Notion: Verify if domain is `https://www.notion.so/*`
Web Extension FE->>Notion: Recursively Parse DOM Elements to paragraphs blocks from the document
Web Extension FE->>FastAPI Backend: Send paragraph blocks to the backend for zero-shot detection
FastAPI Backend->>Web Extension FE: Sends back a score that is tied to each respective paragraph (detection)
Web Extension FE->>Notion: Inject DOM attributes and CSS to highlight high-risk texts
Web Extension FE->>FastAPI Backend: On Click, revalidate any paragraph with a unsatisfactory score that is >= 22.5 threshold
FastAPI Backend->>Web Extension FE: Document.ReplaceText/Element.innerHTML text content with converted text
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Robin Hood is accessible via [Browser Extension(https://www.notion.so/)](https://github.com/Ducksss/HacknRoll2023-Robin-Hood/tree/main/extension), running on-top of Notion.so.

### Browser Extension

<a href="#fastapi-backend"></a>

1. Clone the repo.
   ```sh
   git clone https://github.com/Ducksss/HacknRoll2023-Robin-Hood.git
   ```
2. Visit the Extension Settings Page from your Chromium Browser.
   ```sh
   chrome://extensions/
   ```
3. Enable Developer Mode.
4. Load and Enable the extension from the `extension` folder in this repo.
5. Visit `https://notion.so/` and Start Hacking!

### FastAPI Backend

<a href="#fastapi-backend"></a>

1. Create an OpenAI account and create your own API key by following [this tutorial](https://elephas.app/blog/how-to-create-openai-api-keys-cl5c4f21d281431po7k8fgyol0).
2. Insert your API key to the `docker-compose.yml` file as follows:
   ```yaml
   environment:
     - OPENAI_API_KEY=<insert-your-openai-api-key-here>
   ```
3. Start the FastAPI backend by simply running the following command:
   ```bash
   docker compose up  --build
   ```

For more instructions on how to start development server, please refer to the README file under the `backend` folder.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Extension support for other WYSIWYG editors (e.g. Google Docs, Microsoft Word)
- [ ] Stay up-to-date for SOTA GPT text detection algorithm
- [ ] Enhance GPT completion features (e.g. Text Summarisation, Text Completion, Text Classification)
- [ ] SaaS support for general user with PAYG subscription model
- [ ] Dashboard for past history and history exporting

See the [open issues](https://github.com/Ducksss/HacknRoll2023-Robin-Hood/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Chai Pin Zheng (Frontend Engineer) - [LinkedIn](https://www.linkedin.com/in/chai-pin-zheng-5610921aa/)

- Tham Kei Lok (Frontend Engineer/UIUX Designer) - [LinkedIn](https://www.linkedin.com/in/keiloktql/)

- Grace Ng (AI Engineer/Backend Engineer) - [LinkedIn](https://www.linkedin.com/in/grace-ng-48832821a/)

- Wong Zhao Wu (AI Engineer/Backend Engineer) - [LinkedIn](https://www.linkedin.com/in/zhao-wu-wong/)

Project Link: [https://github.com/Ducksss/HacknRoll2023-Robin-Hood](https://github.com/Ducksss/HacknRoll2023-Robin-Hood)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- References -->

## References

- [GPT-Zero](https://etedward-gptzero-main-zqgfwb.streamlit.app/)
- [OpenAI's GPT-3](https://openai.com/api/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Ducksss/HacknRoll2023-Robin-Hood.svg?style=for-the-badge
[contributors-url]: https://github.com/Ducksss/HacknRoll2023-Robin-Hood/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Ducksss/HacknRoll2023-Robin-Hood.svg?style=for-the-badge
[forks-url]: https://github.com/Ducksss/HacknRoll2023-Robin-Hood/network/members
[stars-shield]: https://img.shields.io/github/stars/Ducksss/HacknRoll2023-Robin-Hood.svg?style=for-the-badge
[stars-url]: https://github.com/Ducksss/HacknRoll2023-Robin-Hood/stargazers
[issues-shield]: https://img.shields.io/github/issues/Ducksss/HacknRoll2023-Robin-Hood.svg?style=for-the-badge
[issues-url]: https://github.com/Ducksss/HacknRoll2023-Robin-Hood/issues
[license-shield]: https://img.shields.io/github/license/Ducksss/HacknRoll2023-Robin-Hood.svg?style=for-the-badge
[license-url]: https://github.com/Ducksss/FakeNews/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
