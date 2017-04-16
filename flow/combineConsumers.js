define([], function() {
	function combineConsumers(consumers) {
	    var consumerKeys = Object.keys(consumers)
	    var finalConsumers = {}
	    
	    for (var i = 0; i < consumerKeys.length; i++) {
	        var key = consumerKeys[i]
	        if (typeof consumers[key] === 'function') {
	            finalConsumers[key] = consumers[key]
	        }
	    }

	    var finalConsumerKeys = Object.keys(finalConsumers)

	    // 返回合成后的 consumer
	    return function combination(model = {}, action) {
	        var hasChanged = false
	        var nextModel = {}
	        for (var i = 0; i < finalConsumerKeys.length; i++) {
	            var key = finalConsumerKeys[i]
	            var consumer = finalConsumers[key]
	            var previousModelForKey = model[key]                                             // 获取当前子 model
	            var nextModelForKey = consumer(previousModelForKey, action) 					 // 执行各子 consumer 中获取子 nextModel
	            nextModel[key] = nextModelForKey                                                 // 将子 nextModel 挂载到对应的键名
	            hasChanged = hasChanged || nextModelForKey !== previousModelForKey
	        }
	        return hasChanged ? nextModel : model
	    }
	}

	return combineConsumers;
});