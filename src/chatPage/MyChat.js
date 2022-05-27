function MyChat({image, name}){
    return(
    <>
        <div className='myPic' href="javascript:void(0);" data-toggle="modal" data-target="#view_info" >
            <img src={image} 
                 alt="avatar"/>
        </div>
        <div className="myName">   
            <div className='myPic' href="javascript:void(0);" data-toggle="modal" data-target="#view_info"></div>
                <div className="m-b-0 w3-large">{name}</div>
            
        </div>
    </>
    );
}

export default MyChat