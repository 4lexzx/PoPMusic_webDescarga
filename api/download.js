// Redirige siempre al APK de la última release publicada en GitHub.
// Si GitHub no responde, usa la copia local incluida en el deploy.
module.exports = async function handler(req, res) {
  const fallback = "/downloads/PoPMusic-v0.1.0.apk";
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300, stale-while-revalidate=600");

  try {
    const response = await fetch(
      "https://api.github.com/repos/4lexzx/PoPMusic/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "popmusic-webdescarga",
        },
      }
    );
    if (!response.ok) throw new Error("GitHub respondio " + response.status);

    const release = await response.json();
    const apk = (release.assets || []).find((a) => a.name.toLowerCase().endsWith(".apk"));
    if (!apk || !apk.browser_download_url) throw new Error("Sin asset APK");

    res.statusCode = 302;
    res.setHeader("Location", apk.browser_download_url);
    return res.end();
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("Location", fallback);
    return res.end();
  }
};
