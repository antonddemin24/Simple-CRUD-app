import React, { useState, useEffect } from 'react';
import { fetchSubscriptions, createSubscription, fetchPreferences, fetchUsers, updateSubscription } from '../services/api';
import { deleteSubscription } from '../services/api';


const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [preferences, setPreferences] = useState([]);
    const [users, setUsers] = useState([]);
    const [newSubscription, setNewSubscription] = useState({
        preference_id: '',
        user_id: '',
        enabled: false,
        id: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateSubscriptionData, setUpdateSubscriptionData] = useState({
        id: '',
        preference_id: '',
        user_id: '',
        enabled: true
    });

    useEffect(() => {
        getSubscriptions();
        getPreferences();
        getUsers();
    }, []);

    const getSubscriptions = async () => {
        try {
                const response = await fetchSubscriptions();
                setSubscriptions(response.data);
            } catch (error) {
                console.error('There was an error fetching the subscriptions!', error);
            }
        };

    const getPreferences = async () => {
        try {
                const response = await fetchPreferences();
                setPreferences(response.data);
            } catch (error) {
                console.error('There was an error fetching the subscriptions!', error);
            }
        };

    const getUsers = async () => {
        try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching the subscriptions!', error);
            }
        };

    const deleteSub = async (id) => {
        try {
            await deleteSubscription(id);
            getSubscriptions();
        } catch (error) {
            console.error("There was an error deleting the subscription!", error);
        }
    };

    const handleNewSubscriptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewSubscription(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUpdateSubscriptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdateSubscriptionData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddSubscription = async () => {
        try {
            await createSubscription(newSubscription);
            getSubscriptions();
            setNewSubscription({ preference_id: '', user_id: '', enabled: true, id: '' }); // Reset form
        } catch (error) {
            console.error('Error creating subscription!', error);
        }
    };

    const handleUpdateSubscription = async () => {
        try {
            await updateSubscription(updateSubscriptionData);
            getSubscriptions();
            setUpdateSubscriptionData({ id: '', preference_id: '', user_id: '', enabled: true }); // Reset form
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating subscription!', error);
        }
    };

    const handleEditSubscription = (subscription) => {
        setUpdateSubscriptionData({
            id: subscription.id,
            preference_id: subscription.preference_id,
            user_id: subscription.user_id,
            enabled: subscription.enabled
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getPreferenceName = (subscription) => {
        const preference = preferences.find(pref => pref.id === subscription.preference_id);
        return preference ? preference.name : 'Unknown';
    };

    const getUserName = (subscription) => {
        const user = users.find(pref => pref.id === subscription.user_id);
        return user ? user.name : 'Unknown';
    };

    return (
        <div>
            <h1>Subscriptions</h1>
            {/* Modal for Update */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Subscription</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubscription(); }}>
                            <label>
                                ID:
                                <input
                                    type="text"
                                    name="id"
                                    value={updateSubscriptionData.id}
                                    onChange={handleUpdateSubscriptionChange}
                                    disabled
                                />
                            </label>
                            <label>
                                Preference:
                                <select
                                    name="preference_id"
                                    value={updateSubscriptionData.preference_id}
                                    onChange={handleUpdateSubscriptionChange}
                                >
                                    <option value="">Select Preference</option>
                                    {preferences.map(pref => (
                                        <option key={pref.id} value={pref.id}>{pref.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                User:
                                <select
                                    name="user_id"
                                    value={updateSubscriptionData.user_id}
                                    onChange={handleUpdateSubscriptionChange}
                                >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Enabled:
                                <input
                                    type="checkbox"
                                    name="enabled"
                                    checked={updateSubscriptionData.enabled}
                                    onChange={handleUpdateSubscriptionChange}
                                />
                            </label>
                            <button type="submit">Update Subscription</button>
                            <button type="button" onClick={handleCloseModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <ul>
                {subscriptions.map(subscription => (
                <li key={subscription.id}>
                    {subscription.id} - {getPreferenceName(subscription)} - {getUserName(subscription)}
                    <button onClick={() => deleteSub(subscription.id)}>Delete</button>
                    <button onClick={() => handleEditSubscription(subscription)}>Edit</button>
                </li>
                ))}
            </ul>
            

            <h2>Add New Subscription</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSubscription(); }}>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={newSubscription.id}
                        onChange={handleNewSubscriptionChange}
                    />
                </label>
                <label>
                    Preference:
                    <select
                        name="preference_id"
                        value={newSubscription.preference_id}
                        onChange={handleNewSubscriptionChange}
                    >
                        <option value="">Select Preference</option>
                        {preferences.map(pref => (
                            <option key={pref.id} value={pref.id}>{pref.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    User:
                    <select
                        name="user_id"
                        value={newSubscription.user_id}
                        onChange={handleNewSubscriptionChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Enabled:
                    <input
                        type="checkbox"
                        name="enabled"
                        checked={newSubscription.enabled}
                        onChange={(e) => setNewSubscription({
                            ...newSubscription,
                            enabled: e.target.checked
                        })}
                    />
                </label>
                <button type="submit">Add Subscription</button>
            </form>
            
        </div>
    );
};

export default Subscriptions;