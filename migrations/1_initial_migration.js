const market = artifacts.require("market.sol");
const token = artifacts.require("token.sol");

module.exports = (deployer) => {
  deployer.deploy(market).then(instance => {
    return deployer.deploy(token, instance.address);
  })
}