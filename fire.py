from firebasedata import LiveData
import pyrebase
import json
import random
import string
import os





config = {
    "apiKey": "AIzaSyCcOzOdg6GYYfNdY8q_mZkoDhVw7NgBACQ",
    "authDomain": "sdpku-52eb1.firebaseapp.com",
    "databaseURL": "https://sdpku-52eb1.firebaseio.com",
    "projectId": "sdpku-52eb1",
    "storageBucket": "sdpku-52eb1.appspot.com",
    "messagingSenderId": "333036971886",
    "googleCloudVisionAPIKey": "AIzaSyBK3V2v3lLIw9tTk0FnC0zLrn67WaEvkoc"
}

firebase = pyrebase.initialize_app(config)

storage = firebase.storage()
db=firebase.database()

g=0
def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)
        

def downloadImages(uid,imageURLs,userName):
    

    print("start Downloading")
    count=0
    N=8
    createFolder('./'+ userName)
    for URL in imageURLs:
        pictureName=''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
        count+=1
        print('image',count)
        storage.child(URL).download(userName+'/'+pictureName+'.jpg')

def veryImagesDownloaded(uid,key):
    name=db.child("/users/"+key).update({"imageDownloaded": "true"})



def getUserName(key):
    name=db.child("/users/"+key+'/name').get()
    print(name.val())
  
    return name.val()

def getImagesNames(uid):
    print(uid)
    imageURLs=[]
    all_images=db.child("/images").order_by_child('uid').equal_to(uid).get()
    for user in all_images.each():
        print(user.val()['imageUrl'])
        imageURLs.append(user.val()['imageUrl'])
    
   
    return imageURLs     

def checkVeryfication(message):
    

    #print(message['data'])
    items= message['data']
    if(g==1):
        for i in items:
            if g==1:
                if (message['data'][i]['veryfied']=='true' and message['data'][i]['imageDownloaded']=='false'):
                    uid=message['data'][i]['uid']
                    
                    downloadImages(uid,getImagesNames(uid),getUserName(i))
                    veryImagesDownloaded(uid,i)
    else:
        data=message['data']
        print(123)
        print (data)
        key=message['path']
        print(key)
        key=key[1:-9]
        uid=db.child("/users/"+key+'/uid').get().val()    
        print(uid) 

        for d in data:
             if(d=='true'):
                print('start')
                downloadImages(uid,getImagesNames(uid),getUserName(key))
                veryImagesDownloaded(uid,key)



            

            


def stream_handler(message):
    global g
    g+=1
    
    #print(message['data'])
    checkVeryfication(message)
    
      
            




my_stream = db.child("users").stream(stream_handler)

while True:
   
    print(stream_handler)
    data = input("[{}] Type exit to disconnect: ".format('?'))
    if data.strip().lower() == 'exit':
        print('Stop Stream Handler')
        if my_stream: my_stream.close()
        break

#j=json.loads(my_stream)


