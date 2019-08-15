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
  
  $('#user-search-field').on('keyup',function(e){
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
        $('#user-search-result').empty();
        user.forEach(function(user){
        var html =buildUser(user);
        $('#user-search-result').append(html);
        $(this).parent().remove();
       })
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })

      function buildAddedUser(user_name, user_id){
        var html_add_user = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                          <input name='group[user_ids][]' type='hidden' value=${user_id}>
                         <p class='chat-group-user__name'>${user_name}</p>
                         <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                         </div>`
        return html_add_user;
      }

      $(document).on('click', '.chat-group-user__btn--add', function(user_name, user_id){
        var user_name = $(this).data("user-name");
        var user_id = $(this).data("user-id");
        var html_add_user =buildAddedUser(user_name, user_id);
        $("#chat-group-users").append(html_add_user);
        $(this).parent().remove();
        });
  })
      $(document).on('click', '.chat-group-user__btn--remove', function(){
        $("#chat-group-user-8").remove()
      })
});