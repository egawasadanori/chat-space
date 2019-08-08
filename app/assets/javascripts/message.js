$(function(){
  function buildMessage(message){
     var html = `<div class="message">
                    <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                  </div>
                  <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    
                    </div>
                 </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
     var formData = new FormData(this);
     var url = $(this).attr('action');
     $.ajax({
       url: url,
       type: "POST",
       data: formData,
       dataType: 'json',
       processData: false,
       contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content').val('')
      $('input').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    })
    .fail(function(){
      alert('エラー')
    })
  })
  
  function buildMessageHTML(message){
    console.log("成功");
  //var buildMessageHTML = function(message) {
    if (message.content && message.image.url){
      //data-idが反映されるようにしている
      var html_update = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
   } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html_update = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<p class="lower-message__content">' +
            message.content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html_update = '<div class="message" data-id=' + message.id + '>' +
        '<div class="upper-message">' +
          '<div class="upper-message__user-name">' +
            message.user_name +
          '</div>' +
          '<div class="upper-message__date">' +
            message.created_at +
          '</div>' +
        '</div>' +
        '<div class="lower-message">' +
          '<img src="' + message.image.url + '" class="lower-message__image" >' +
        '</div>' +
      '</div>'
    };
    return html_update;
  //}
};
  
      function reloadMessages () {
        if(window.location.href.match(/\/groups\/\d+\/messages/)) {
          console.log("ok");
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message').last().data('id')
        console.log(last_message_id);
        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: '/groups/group_id/api/messages',
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(data) {
          console.log(data);         
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          data.forEach(function(message){
          //追加するHTMLの入れ物を作る
          var html_update = buildMessageHTML(message);
          $(".messages").append(html_update);
          $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          console.log('error');
        });
      };
     }
  setInterval(reloadMessages, 5000);
});