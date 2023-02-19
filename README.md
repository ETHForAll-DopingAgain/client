# MetaVid
A blockchain-based video platform that aims to provide a secure and efficient subscription-based streaming experience.

![](https://i.imgur.com/Vy3JLCO.png)

## Table of Contents  
1. [Problem we solve](#Problem-it-Solves)  
2. [Solution](#Solution)  
3. [Features](#Features)
4. [Data Provider side architecture](#Data-Provider-Side)
5. [User Side Architecture](#Consumer-side)
<a name="#Solution"/>

## Problem it Solves
* With the growing trend of over-the-top (OTT) streaming services like Netflix, password sharing and misuse have become major issues. This not only results in revenue losses for the companies but also hampers the overall user experience
* Security of the user and the data provider is one of the major issue in subscription based models.
* Many decentralised platforms also provide inconvinent way of payments where the user has to pay in given mentioned tokens and chains hence reducing user convinence and limiting number of users.
* Subscription based paltform also doesn't provide the service to content creator whose content is generally live streamed like professional gamers.
* That's where MetaVid comes in - a blockchain-based video platform that aims to provide a secure and efficient subscription-based streaming experience.

## Solution 
* Our platform uses a subscription model that gets renewed upon the user's subscription, thereby ensuring that only authorised users can access it. To further enhance security, we require a linked MetaMask account to stream content, which prevents password sharing and misuse.
* We store only required user data on the fairly secure and decentralised data storage service like IPFS. We store the data in encoded form and hence we ensure that the user data is decentralised as well as secure.
* We provide the feature of live stream using Livepeer and hence imporving the number of data providers and providing more options to the users.
* The user can pay using the chain of his choice and should not worry about the requirements of the data provider. Swapping the assets from the chain on which user paid to the prefered chain of the data provider is handelled internally by using Connext SDK for cross chain tranasaction.


## Features

1. Decreasing the gap between the consumer and data provider by removing middleware and also ensuring that the user get what he pays for like the data provider streaming at 480p and declaring it to be 720p is not possible because of **increased transperancy** which is provided by Livepeer.

![](https://i.imgur.com/bYUjvNe.jpg)


2. **Livepeer** ensures that the live stream is of the mentioned **bitrate** and **FPS** provided by the data provider which ensures transperancy.
3. We are using **Arcana Auth** which provides Web2 like authorization for Web3 which improves the user experience and also provides with personalised wallet just by Google OAuth.

![](https://i.imgur.com/2Y4rLO4.png)


4. We are using Superfluid for continuous stream of tokens from the user to the data provider and the user pays only for their **Watch time**. This helps the data provider to monetize their content and gives full control of subscription to the users.
5. We have coupled Connext and Superfluid to provide **cross chain transactions** to make the transaction more user friendly.
6. The integration of Push Protocol to provide Web3 based notification to the users on every event like subscription, uploading video, deleting video, resuming the session and cancelling the subscription to notifying the user. 

![](https://i.imgur.com/rwgFGHV.png)


# Data Provider Side
![](https://i.imgur.com/z87GnRO.png)


# Consumer side
![](https://i.imgur.com/FLp9ZIM.png)

