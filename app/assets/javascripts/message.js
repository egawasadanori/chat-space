$(function(){
  // function buildMessage(message){
  //    var html = `<div class="message" data-id=${message.id}>
  //                   <div class="upper-message">
  //                   <div class="upper-message__user-name">
  //                     ${message.name}
  //                 </div>
  //                 <div class="upper-message__date">
  //                     ${message.created_at}
  //                   </div>
  //                   </div>
  //                   <div class="lower-message">
  //                   <p class="lower-message__content">
  //                     ${message.content}
  //                   </p>
  //                   
  //                   </div>
  //                </div>`
  //   return html;
  //}
  function buildMessageHTML(message){
    var image = message.image.url ? `<img src= ${message.image.url} class="lower-message__image" />` :"";
    var content = message.content ? `<p class="lower-message__content">${message.content}</p>` :"";
    var html =
    `<div class="message" data-id=${message.id}>
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${content}
        </p>
         ${image}
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
      var html = buildMessageHTML(message);
      $('.messages').append(html)
      $('#message_content').val('')
      $('input').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    })
    .fail(function(){
      alert('エラー')
    })
  })
  
  
  
      function reloadMessages () {
        if(window.location.href.match(/\/groups\/\d+\/messages/)) {
        var last_message_id = $('.message').last().data('id')
        var current_group_id = $('.current-group').last().data('group-id')
        $.ajax({
          url: `/groups/${current_group_id}/api/messages`,
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(data) {        
          data.forEach(function(message){
          var html = buildMessageHTML(message);
          $(".messages").append(html);
          $(".messages").animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          alert('エラー');
        });
       };
      }
  setInterval(reloadMessages, 5000);
});