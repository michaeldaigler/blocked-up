module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
    await deploy("PasswordManager", {
      from: deployer,
      // gas: 4000000,
    //   args: ["PasswordManager set from ./deploy/PasswordManager.ts"],
    });
  };
