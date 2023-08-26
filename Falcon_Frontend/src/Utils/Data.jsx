export const categories=[
    {
        name:'Entertainment',
        image:'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Technology',
        image:'https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Photography',
        image:'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Gaming',
        image:'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Travel',
        image:'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Food',
        image:'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Fitness & Health',
        image:'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Fashion',
        image:'https://images.pexels.com/photos/4132651/pexels-photo-4132651.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Sports',
        image:'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Books',
        image:'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'DIY & Crafts',
        image:'https://images.pexels.com/photos/5303016/pexels-photo-5303016.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Relationships',
        image:'https://images.pexels.com/photos/4758266/pexels-photo-4758266.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Finance',
      image:'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Education',
      image:'https://images.pexels.com/photos/3768129/pexels-photo-3768129.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Politics & Current Events',
      image:'https://images.pexels.com/photos/6172591/pexels-photo-6172591.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Self Improvement',
      image:'https://images.pexels.com/photos/7991662/pexels-photo-7991662.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Photography',
      image:'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Humor & Memes',
      image:'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Science & Nature',
      image:'https://images.pexels.com/photos/355938/pexels-photo-355938.jpeg?auto=compress&cs=tinysrgb&w=600'
    }, 
    {
      name:'Music',
      image:'https://images.pexels.com/photos/2701570/pexels-photo-2701570.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      name:'Lifestyle',
      image:'https://images.pexels.com/photos/4062339/pexels-photo-4062339.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:'Others',
        image:'https://images.pexels.com/photos/7788664/pexels-photo-7788664.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    

]


export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
