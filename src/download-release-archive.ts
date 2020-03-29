const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const tc = require('@actions/tool-cache');


async function download_archive(owner, repo, ref ) {
    try {
        
        const octokit = new Octokit();

        const archive_format = "tarball";

        const tag = "v1.0.0"
        
        const tarFile = `${tag}.tar.gz`;

        console.log("Calling API ...");
        octokit.repos.getArchiveLink({
            owner,
            repo,
            archive_format,
            ref
        }).then(( { data }) => {
            fs.writeFileSync(tarFile, Buffer.from(data));
        }).catch( function(error){
            console.log(error);
        });

        console.log(`Tarball Location : ${tarFile}`);

        return tarFile;

    } catch (error) {
        core.setFailed(error.message);
    }
}

module.exports = download_archive;
