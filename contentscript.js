

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
            // 현재 탭의 body 텍스트를 가져옴
            return document.querySelector("body").innerText;
        }
    }).then((results) => {
        // results는 배열 형태로 반환됨
        if (results && results[0]) {

            var bodyText = results[0].result;
            var bodyNum = bodyText.split(' ').length;
            var myNum = bodyText.match(new RegExp('다','g')).length;
            var perMyNum = myNum+'/'+bodyNum+'('+(myNum/bodyNum*100).toFixed(2)+'%)';

            // id값이 result인 태그에 결과에 추가한다
            document.querySelector('#result').innerText = perMyNum;

           
        } else {
            console.log("No result returned");
        }
    }).catch((error) => {
        console.error("Script execution failed: ", error);
    });
});
