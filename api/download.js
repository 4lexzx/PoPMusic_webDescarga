// Descarga siempre actualizada: redirige al asset mas reciente de GitHub.
//  - /api/download               -> APK de Android (release "latest")
//  - /api/download?platform=windows -> instalador .exe (ultimo release de PC)
// Si GitHub falla: APK local de respaldo / pagina de Releases para el exe.
module.exports = async function handler(req, res) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "popmusic-webdescarga",
  };
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300, stale-while-revalidate=600");

  const rawPlatform =
    (req.query && req.query.platform) ||
    (String(req.url || "").match(/[?&]platform=([^&]+)/) || [])[1] ||
    "android";
  const platform = String(rawPlatform).toLowerCase();
  const isWindows = ["windows", "win", "pc", "exe"].includes(platform);

  try {
    let assetUrl = null;

    if (isWindows) {
      // Los releases de PC usan tags "pc-vX.Y.Z"; "latest" apunta al APK.
      const response = await fetch(
        "https://api.github.com/repos/4lexzx/PoPMusic/releases?per_page=30",
        { headers }
      );
      if (!response.ok) throw new Error("GitHub respondio " + response.status);
      const releases = await response.json();

      const pcRelease = releases.find(
        (release) =>
          String(release.tag_name || "").startsWith("pc-") &&
          (release.assets || []).some((a) => a.name.toLowerCase().endsWith(".exe"))
      ) || releases.find((release) =>
        (release.assets || []).some((a) => a.name.toLowerCase().endsWith(".exe"))
      );

      if (!pcRelease) throw new Error("No hay release de PC con exe");
      const exe = pcRelease.assets.find((a) => a.name.toLowerCase().endsWith(".exe"));
      assetUrl = exe.browser_download_url;
    } else {
      const response = await fetch(
        "https://api.github.com/repos/4lexzx/PoPMusic/releases/latest",
        { headers }
      );
      if (!response.ok) throw new Error("GitHub respondio " + response.status);
      const release = await response.json();
      const apk = (release.assets || []).find((a) => a.name.toLowerCase().endsWith(".apk"));
      if (!apk) throw new Error("No hay asset APK");
      assetUrl = apk.browser_download_url;
    }

    res.statusCode = 302;
    res.setHeader("Location", assetUrl);
    return res.end();
  } catch (error) {
    res.statusCode = 302;
    res.setHeader(
      "Location",
      isWindows
        ? "https://github.com/4lexzx/PoPMusic/releases"
        : "/downloads/PoPMusic-v0.1.0.apk"
    );
    return res.end();
  }
};
