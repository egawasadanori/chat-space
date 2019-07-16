$(function(){
  function buildUser(user){
    var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">
                 ${user.name}
                 </p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                 </div>`                                 
    return html; 
    }
  
  $('#new_group').on('keyup',function(e){
    // e.preventDefault(); 
      var input = $(this).val(); 
      $.ajax({ 
        url:'/users', 
        type: 'GET',
        data: ('keyword=' + input),
        processData: false, 
        contentType: false,
        dataType: 'json'
      })
      
      .done(function(user){
        // console.log(data)
        // $('#chat-group-user').append(html)
        //  var html =buildUser(user);
        
        user.forEach(function(user){
        var html =buildUser(user);
        $('#user-search-result').append(html);
        // $('#user-search-result').val('');
        $('#user-search-result').find('#user-search-result').remove();
       })
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })

      function buildAddedUser(user){
        var html_add_user = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                          <input name='group[user_ids][]' type='hidden' value=${user.id}>
                         <p class='chat-group-user__name'>${user.name}</p>
                         <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                         </div>`
        return html_add_user;
      }

      $(document).on('click', '.chat-group-user__btn--add', function(){
        // console.log("ok")
        // var input = $(this).val();
         
        $.ajax({ 
          url:'/users', 
          type: 'GET',
          data: ('keyword=' + input),
          processData: false, 
          contentType: false,
          dataType: 'json'
      })
      .done(function(user){
        console.log(user);
        var html_add_user =buildAddedUser(user);
        $("#chat-group-users").append(html_add_user);
        })
      
      .fail(function(){
        alert('メンバー追加に失敗しました')
      })
      })
  });
});