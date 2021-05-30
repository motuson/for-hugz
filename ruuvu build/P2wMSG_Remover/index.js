module.exports = function SaltRemover(dispatch) {
    dispatch.hook('S_SYSTEM_MESSAGE', 1, event => {
        if (event.message.includes("@2400")) {
            return false
        }
    });
};
