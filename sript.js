function matching(user){

    chrome.tabs.executeScript({
        code:'document.querySelector("body").innerText'
    },function(result){
       var bodyText = result[0];
       var bodyNum = bodyText.split(' ').length;
       var queryNum = bodyText.match(new RegExp('\\b('+user+')\\b','gi')).length;

       var value = queryNum/bodyNum*100;
       value = value.toFixed(1);
       document.querySelector('#result').innerText = queryNum+'/'+bodyNum+'('+value+'%)';
    });
}

chrome.storage.sync.get(function(data){
    document.querySelector('#user').value = data.userWord;

    matching(data.userWord);
});


document.querySelector('#user').addEventListener('change',function(){
    var user = document.querySelector('#user').value;

    chrome.storage.sync.set({
        userWord : user
    });

    matching(user);
});
