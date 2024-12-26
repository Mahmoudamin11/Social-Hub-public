import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Community from "../../Components/socialHub/MyCommunities/Community";
import CreateCommunity from "../../Components/socialHub/MyCommunities/CreateCommunity";
import NoCommunitiesJoined from "../../Components/socialHub/MyCommunities/NoCommunitiesJoined";
import { updateUserCommunities } from "../../Redux/slices/userSlice";

const MyCommunities = memo(() => {
  const { user, status, error } = useSelector((state) => state.user);
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  const [allMyCommunities, setallMyCommunities] = useState(
    user && user.communities ? user.communities : [] );
    const dispatch = useDispatch();
    console.log(user); // user details
    useEffect(() => { 
      window.scrollTo(0, 0);
      setallMyCommunities(user && user.communities ? user.communities : []);
    }, [user])
  // Modals function 
  const handleOpenCreateCommunityModal = () => {
    setOpenCreateCommunityModal(true);
  };
  const handleCloseCreateCommunityModal = () => {
    setOpenCreateCommunityModal(false);
  };

  const handleLeaveCommunity = (commId, restore = false) => { 
    setallMyCommunities((prev) => {
      const updatedCommunities = restore
        ? [...prev, user.communities.find((comm) => comm._id === commId)]
        : prev.filter((id) => id !== commId);

      // Dispatch an action to update Redux state
      dispatch(updateUserCommunities(updatedCommunities));

      return updatedCommunities;
    });
  };

  const handleAddCreatedCommunity = (comm) => { 
    if (comm) { 
      setallMyCommunities([...allMyCommunities, comm]);
      dispatch(updateUserCommunities([...user.communities, comm]));
    }
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Static title */}
      <div className="w-full flex items-end mb-16 justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold ">My Communities</h2>
        {user && user.communities && user.communities.length > 0 && (
          <button
            onClick={handleOpenCreateCommunityModal}
            className="text-xs trans bg-main-color hover:bg-sec-color text-white py-2 px-2 sm:px-4 rounded-md"
          >
            Create Community
          </button>
        )}
      </div>

      {/* Fetch error */}
      {status === "failed" && <p>{error.message}</p>}

      {/* Proccess succeeded */}
      {status === "succeeded" && (
        <>
        
          {/* You have communities */}
          {user && allMyCommunities &&  allMyCommunities.length > 0 && (
              <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {allMyCommunities.map((communityID) => (
                      <Community user={user ? user : null} key={communityID} communityId={communityID} leaveCommunity={handleLeaveCommunity}  />
                  ))}
              </div>
          )}
          
          {/* No communities */}
          {user &&  allMyCommunities.length === 0  && <NoCommunitiesJoined handleOpenCreateCommunityModal={handleOpenCreateCommunityModal} />}

        </>
      )}

      {openCreateCommunityModal && 
        <CreateCommunity handleCreateCommunity={handleAddCreatedCommunity} closeCreateModal={handleCloseCreateCommunityModal} />
      }

      
    </div>
  );
});

export default MyCommunities;