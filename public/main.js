const form = document.getElementById('vote-form');
form.addEventListener('submit',(e)=>{
    const choice= document.querySelector('input[name=os]:checked').value;
    const data = {os:choice};
    fetch('/poll',{
        method:'post',
        body:JSON.stringify(data),
        headers:new Headers({
            'content-Type':'application/json'
        })
    })
    .then(res=>res.json())
    .then()
    .catch(err=>console.log(err));
    e.preventDefault();
});


fetch('/poll').then(res=>res.json()).then(data=>{
   
    const votes = data.votes;
    const totalVotes = votes.length;
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),{});
    
    let dataPoints=[
    {label:'Window',y:voteCounts.Window},
    {label:'macos',y:voteCounts.macos},
    {label:'Linux',y:voteCounts.Linux},
    {label:'Other',y:voteCounts.Other}
];
const chartContainer = document.querySelector('#chartCanavas');
if(chartContainer){
    const chart = new CanvasJS.Chart('chartCanavas',{
        animationEnabled:true,
        theme:'theme1',
        title:{
            text:'Os results'
        },
        data:[
            {
                type:'column',
                dataPoints:dataPoints
            }
        ]
    });
    chart.render();
    Pusher.logToConsole = true;

    var pusher = new Pusher('42c58515e947a2dd2528', {
      cluster: 'ap2',
      forceTLS: true
    });
    console.log("rerendercall0")
    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints=dataPoints.map(x=>{
          if(x.label===data.os){
              x.y+=data.points;
              return x;
          }else{
              return x;
          }
      })
     
      chart.render();
    });

}
})
