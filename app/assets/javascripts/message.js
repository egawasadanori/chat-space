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
    //  console.log(formData);
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
      console.log(message)
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content').val('')
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('エラー')
    })
  })
 });
