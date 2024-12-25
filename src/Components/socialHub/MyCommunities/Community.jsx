
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { API } from '../../../Api/Api';
import CommunityAdmin from './CommunityAdmin';
import CommunityMembers from './CommunityMembers';
import InviteUsersModal from './InviteUsersModal';
import sweetalert from '../../../Utils/sweetalert';
import { showToast } from '../../../Utils/showToast';

const Community = memo(({user, communityId, leaveCommunity}) => {
    const [community, setcommunity] = useState(null)
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(null)
    const [openInviteUsersModal, setOpenInviteUsersModal] = useState(false);
    const [isCurrUserAdmin, setIsCurrUserAdmin] = useState(false);
    // Fetch and process community details
    useEffect(() => {
        
        const fetchCommunity = async () => {
            if (communityId) {
                try {
                    setloading(true)
                    const comm = await axios.get(`${API.getCommunityById}/${communityId}`);
                    setcommunity(comm.data.community); 
                    setIsCurrUserAdmin(comm.data.community.admins.includes(user._id)); 
                } catch (error) {
                    seterror(error);
                } finally{ 
                    setloading(false)
                }
            }
        };
        fetchCommunity();
    }, []);

    const handleOpenInviteUsersModal = () => { 
        setOpenInviteUsersModal(true)
    } 
    const handleCloseInviteUsersModal = () => { 
        setOpenInviteUsersModal(false)
    }  
    const handleLeaveCommunity = async () => { 
        const details = {
            title: 'Are you sure you want to leave?',
            text: `You are about to leave ${community ? community.name : "this community"}`,
            confirmBtn: "Leave",
            cancelBtn: "Cancel"
        };
        
        const result = await sweetalert.deleteOrNot({ ...details });

        if (result.isConfirmed)  { 
            // optimistic remove
            leaveCommunity(community._id);  
            try {
                // Call backend to leave the community
                await axios.post(`${API.leaveCommunity}/${community._id}`);
                showToast('success', `You left the community`);
            } catch (error) {
                console.error("Failed to leave the community:", error);
                showToast('error', `${error.response.data.message || "You didn't leave the community"}`);
                // restore it again if error happend
                leaveCommunity(null, community._id); 
            }
        }
    };
    
    return (
        <>
            {/* if it loading show Skeletons */}
            {loading && (
                <div  className="p-4 text-black flex flex-col gap-1 bg-gray-100 border border-gray-200 rounded-md">
                    <Skeleton width={'50%'} height={20} count={1} />
                    <Skeleton width={'25%'} height={20} count={1} />
                    <Skeleton width={'25%'} height={20} count={1} />
                </div>
            )}
            
            {!loading && !error && community && <div  className="p-2 sm:p-4 text-black flex flex-col gap-3 bg-gray-100 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between">
                    <div className=" flex gap-1 max-sm:mr-auto items-center ">
                        <h3 className="font-bold text-sm sm:text-lg">{community.name.length > 18 ? community.name.slice(0, 15) + "..."  : community.name}</h3>
                        {isCurrUserAdmin && <p>Delete</p>}
                    </div>
                    <div className="flex gap-2   items-center">
                        {/* <p className="text-xs text-gray-600">Created {getDateFormatted(community.createdAt)}</p> */}
                        <button onClick={handleLeaveCommunity} className="p-2 flex items-center  text-xs border border-main-color text-main-color trans hover:bg-gray-200 rounded-md">
                            Leave
                        </button>
                        <button onClick={handleOpenInviteUsersModal} className="p-2 flex items-center  text-xs bg-main-color text-white trans hover:bg-sec-color rounded-md">
                            Invite
                        </button>
                    </div>
                </div>
                <div className="flex w-full gap-10">
                    {community.admins && community.admins.length > 0 && <div className="flex flex-col  w-fit select-none   rounded-md">
                        <h4  className="flex items-center text-xs text-gray-500 font-semibold">Admin</h4>
                        <div className="bg-red-200 mt-1 rounded-md cursor-pointer trans hover:bg-red-300">
                            {
                                <CommunityAdmin admin={community.admins} />
                            }
                        </div>
                    </div>}
                    {community.members && community.members.length > 0 && <div className="flex flex-col  w-fit select-none   rounded-md">
                        <h4  className="flex items-center text-xs text-gray-500 font-semibold">Members</h4>
                        <div className=" mt-1  rounded-md cursor-pointer trans ">
                            {
                                <CommunityMembers members={community.members} />
                            }
                        </div>
                    </div>}
                </div>
            </div>}

            {community && openInviteUsersModal  && <InviteUsersModal community={community ? community : null}  followersArr={user.SubscribersOrFollowers} followedArr={user.SubscriberedOrFollowed} onClose={handleCloseInviteUsersModal} /> }
        </>
    )
})

export default Community;