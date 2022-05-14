import axios from 'axios';
import {API_URL} from '../Supports/Functions/helper'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useLikedPostsSearch(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const token = localStorage.getItem('myTkn')
    const {id} = useSelector(state => state.userReducer)

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios.post(`${API_URL}/posts/getlikedposts?page=${pageNumber}&limit=6`, {ownId: id}, {
            headers: {
            authorization: token
            }
        }).then(res => {
        setPosts(prevPosts => {
            return [...prevPosts, ...res.data.map(post => ({
                id: post.id,
                image: post.image,
                caption: post.caption,
                created_at: post.created_at,
                unique_id: post.unique_id,
                users_id: post.users_id,
                profilePic: post.profilePic,
                username: post.username,
                likes: post.likes,
                isLiked: post.isLiked
            }))]
        })
        setHasMore(res.data.length > 0)
        setLoading(false)
        }).catch(e => {
            setLoading(false)
            setError(true)
            setErrorMsg(e.message)
        })
    }, [pageNumber])

    return { loading, error, posts, hasMore, errorMsg }
}