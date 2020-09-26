const { maroon } = require("color-name");
var express = require("express");
const { checkServerIdentity } = require("tls");
var app = express();
let rowNo = new Map();
var matrix = new Array(6);
function showMatirx()
{

}
for (var i=0;i<7;i++)
    {
        rowNo[i]=0;
    }
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(7);
        for(var j=0;j<7;j++)
        {
            matrix[i][j]=0;
        }
    }
    var turn=0;
app.get("/start", (req, res) => {
    res.json("READY")
    //res.send("You will be redirected to column route where in you need to pass valid column number in the route")
    //req.flash("READY")
    // if(req.method=='GET')
    // {
    //     res.redirect('/column')
    // }
    
    turn =0;
    for (var i=0;i<7;i++)
    {
        rowNo[i]=0;
    }
    
     matrix = new Array(6);
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(7);
        for(var j=0;j<7;j++)
        {
            matrix[i][j]=0;
        }
    }
});

function check2()
{
    for(var i=0;i<6;i++)
    {
        for(var j=0;j<7;j++)
        {
            if(i+3<=5)
            {
                if(matrix[i][j]=='B'&&matrix[i+1][j]=='B'&&matrix[i+2][j]=='B'&&matrix[i+3][j]=='B')
                {
                    return 1;
                }
            }
            if(i-3>=0)
            {
                if(matrix[i][j]=='B'&&matrix[i-1][j]=='B'&&matrix[i-2][j]=='B'&&matrix[i-3][j]=='B')
                {
                    return 1;
                }
            }
            if(j+3<=6)
            {
                if(matrix[i][j]=='B'&&matrix[i][j+1]=='B'&&matrix[i][j+2]=='B'&&matrix[i][j+3]=='B')
                {
                    return 1;
                }
            }
            if(j-3>=0)
            {
                if(matrix[i][j]=='B'&&matrix[i][j-1]=='B'&&matrix[i][j-2]=='B'&&matrix[i][j-3]=='B')
                {
                    return 1;
                }
            }
            if(i-3>=0&&j+3<=6)
            {
                if(matrix[i][j]=='B'&&matrix[i-1][j+1]=='B'&&matrix[i-2][j+2]=='B'&&matrix[i-3][j+3]=='B')
                {
                    return 1;
                }
            }
            if(i+3>=5&&j+3<=6)
            {
                if(matrix[i][j]=='B'&&matrix[i+1][j+1]=='B'&&matrix[i+2][j+2]=='B'&&matrix[i+3][j+3]=='B')
                {
                    return 1;
                }
            }
        }
    }
    return 0;
}
function check1()
{
    for(var i=0;i<6;i++)
    {
        for(var j=0;j<7;j++)
        {
            if(i+3<=5)
            {
                if(matrix[i][j]=='A'&&matrix[i+1][j]=='A'&&matrix[i+2][j]=='A'&&matrix[i+3][j]=='A')
                {
                    return 1;
                }
            }
            if(i-3>=0)
            {
                if(matrix[i][j]=='A'&&matrix[i-1][j]=='A'&&matrix[i-2][j]=='A'&&matrix[i-3][j]=='A')
                {
                    return 1;
                }
            }
            if(j+3<=6)
            {
                if(matrix[i][j]=='A'&&matrix[i][j+1]=='A'&&matrix[i][j+2]=='A'&&matrix[i][j+3]=='A')
                {
                    return 1;
                }
            }
            if(j-3>=0)
            {
                if(matrix[i][j]=='A'&&matrix[i][j-1]=='A'&&matrix[i][j-2]=='A'&&matrix[i][j-3]=='A')
                {
                    return 1;
                }
            }
            if(i-3>=0&&j+3<=6)
            {
                if(matrix[i][j]=='A'&&matrix[i-1][j+1]=='A'&&matrix[i-2][j+2]=='A'&&matrix[i-3][j+3]=='A')
                {
                    return 1;
                }
            }
            if(i+3>=5&&j+3<=6)
            {
                if(matrix[i][j]=='A'&&matrix[i+1][j+1]=='A'&&matrix[i+2][j+2]=='A'&&matrix[i+3][j+3]=='A')
                {
                    return 1;
                }
            }
        }
    }
    return 0;
}
var cnt=42;
var complete=0;
    app.get("/column/:id",(req,res)=>{
        res.setHeader('Content-Type', 'text/html');
        console.log(req.params.id)
        var num=req.params.id;
        if(num<0|num>7)
        {
            res.send("Invalid Input please give your input again the input should be between [0,6]");
        }
        else{
            console.log(rowNo[num],num);
            if(rowNo[num]>5)
            {
                res.send("Invalid Input please give your input again the column you entered is already full please try some another column");
            }
            else{
                
                if(turn==1)
                {
                    matrix[rowNo[num]][num]='B'
                    if(check2()===1)
                    {
                        res.send("player 2 wins")
                        complete=1;
                        //res.end();
                       // res.end();
                    }
                    //turn=0;
                }
                else{
                    matrix[rowNo[num]][num]='A'
                    console.log(check1())
                    if(check1()===1)
                    {
                        res.send("player 1 wins")
                        complete=1;
                        //res.end();
                        //res.end();
                    }
                    //turn =1;
                }
                // if(check())
                // {
                //     if(turn===1)
                //     {
                //         res.send("Player 2 wins");
                //     }
                //     else{
                //         res.send("player 1 wins");
                //     }
                // }
                cnt--;
                rowNo[num]++;
               // console.log(matrix)
                
                //var copyMat = JSON.stringify(matrix);
                res.write("Valid<br>")
                console.log("HEre");
                for(var i =matrix.length-1;i>=0;i--)
                {
                    console.log(matrix[i]);
                    var copyMat = JSON.stringify(matrix[i]);
                    res.write(copyMat)
                    res.write("<br>");
                }
                
                if(turn==0)
                {
                    res.write("player 2's turn")
                    turn=1;
                }
                else
                {
                    res.write("player 1's turn")
                    turn=0;
                }
                //send multiple responses to the client
                
                //end the response process
                
                if(cnt==0)
                {
                    res.send("Game tied")
                    //res.end();
                    complete=1;
                }
                res.end();
            }
            
        }
    });
   
    app.listen(5000, () => {
        console.log("Server running on port 5000");
       });
 
