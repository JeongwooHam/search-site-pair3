# search-site-pair3

### 💡 개인 회고
[CSS, API Call](https://velog.io/@hamjw0122/%ED%9A%8C%EA%B3%A0-%EA%B2%80%EC%83%89%EC%96%B4-%EC%A1%B0%ED%9A%8C-%EC%82%AC%EC%9D%B4%ED%8A%B8-1) <br/>
[useContext, useReducer](https://velog.io/@hamjw0122/%ED%9A%8C%EA%B3%A0-%EA%B2%80%EC%83%89%EC%96%B4-%EC%A1%B0%ED%9A%8C-%EC%82%AC%EC%9D%B4%ED%8A%B8-2)

<hr/>
<img src="https://github.com/FrontEnd-Team3/search-site-pair3/assets/123251211/62fc9ffa-ca74-4efa-90ae-ce44faa4a917" width="500px"/>
<br/>
json-server로 구현된 API를 활용한 검색어 조회 사이트입니다. <br/>
debouncing 기능을 활용하여 API 요청을 최적화하고,<br/>
local storage를 사용하여 새로고침을 하여도 검색 기록이 유지될 수 있도록 하였습니다.<br/>
또한 추후 프론트엔드 코드와 백엔드 코드가 개별적으로 업데이트 되거나 재사용 될 가능성을 염두에 두고,<br/>
Vercel과 Glitch를 통해 프론트엔드 코드와 백엔드 코드를 따로 배포해보았습니다. <br/>


## 📌 배포 링크
- FRONT-END
: https://search-site-pair3-xayg-git-refactoring-pair2.vercel.app/
- BACK-END
: https://cloudy-stone-juice.glitch.me/

## 📋 프로젝트 기록
프로젝트 구현 일지 및 API 최적화 방법, CORS 에러에 대해 공부한 후 작성하였습니다. <br/>
https://gentle-tin-2c4.notion.site/3-7f96b641febc4d36b1c2d365ca724406?pvs=4

## 🗂️ 폴더 구조
<details>
<summary>Folder Structure</summary>
<div markdown="1">
<blockquote>
📦src<br/>
 ┣ 📂apis<br/>
 ┃ ┣ 📜@core.js<br/>
 ┃ ┗ 📜search.js<br/>
 ┣ 📂components<br/>
 ┃ ┣ 📜recentlySearched.js<br/>
 ┃ ┣ 📜search-bar.js<br/>
 ┃ ┣ 📜searchResults.js<br/>
 ┣ 📂context<br/>
 ┃ ┣ 📜inputData.js<br/>
 ┃ ┗ 📜targetwords.js<br/>
 ┣ 📂hooks<br/>
 ┃ ┗ 📜useDebounce.js<br/>
 ┣ 📂pages<br/>
 ┃ ┗ 📜index.js<br/>
 ┣ 📂style <br/>
 ┃ ┗ 📜global.js <br/>
 ┣ ...
</blockquote>
</div>
</details>

## 👾 팀원
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/seungyonggo"><img src="https://avatars.githubusercontent.com/u/123628457?v=4" width="100px;" alt="승용"/><br /><sub><b>고승용</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/GrayHound0801"><img src="https://avatars.githubusercontent.com/u/126382636?v=4" width="100px;" alt="재원"/><br /><sub><b>심재원</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/JeongwooHam"><img src="https://avatars.githubusercontent.com/u/123251211?v=4" width="100px;" alt="정우"/><br /><sub><b>함정우</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
