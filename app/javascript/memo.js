const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  // 「投稿された」というイベントを認識
  // eを「投稿ボタンをクリックした」という情報を持ったオブジェクトにしている
  form.addEventListener("submit", (e) => {
    // preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化している
    e.preventDefault();
    // フォームに入力された値を取得できるオブジェクトを生成し、引数にフォームの様相を渡して、そのフォームに入力された値を取得できる
    const formData = new FormData(form);
    // JavaScriptを用いてサーバーとHTTP通信を行うときに利用するオブジェクトを生成し、変数に代入
    // これでJavaScriptからサーバーサイドにリクエストを送信することが可能になる
    const XHR = new XMLHttpRequest();
    // リクエストを初期化するメソッドだが、リクエストの内容を指定するためのメソッドだと理解しておいていい
    // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述
    XHR.open("POST", "/posts", true);
    // レスポンスのデータフォーマット（＝どのような形式のデータにするか）を指定するプロパティ
    // リクエストを送信する際にレスポンスで欲しいデータフォーマットをあらかじめ指定しておく
    XHR.responseType = "json";
    // フォームの内容をコントローラーへ送信
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
 };
 
 window.addEventListener('turbo:load', post);