module.exports = {
    post:{
        tags:['auth'],
        description: "Register user",
        operationId: "createUser",
        // parameters:[
        //     {
        //         name:"id",
        //         in:"path",
        //         schema:{
        //             $ref:"#/components/schemas/User"
        //         },
        //         required:true,
        //         description: "A single todo id"
        //     }
        // ],
        requestBody: {
            required:true,
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/User'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "User created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}