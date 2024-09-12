const custom = {
    getLineID(agent)
    { 
        return agent.originalRequest.payload.data.source.userId; 

    },
}


module.exports = custom;