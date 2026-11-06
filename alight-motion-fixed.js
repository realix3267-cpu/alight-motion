

(function () {
  const TAG = "[Alight Motion]";
  const url = $request?.url || "";
  const body = $response?.body;

  try {
    if (!url.includes("getAccountStatusAndLicenses")) {
      console.log(TAG + " Unexpected URL: " + url);
      $done({});
      return;
    }

    if (typeof body !== "string" || !body.length) {
      console.log(TAG + " Empty response");
      $done({});
      return;
    }

    let data;

    try {
      data = JSON.parse(body);
    } catch (error) {
      console.log(TAG + " Invalid JSON: " + error.message);
      $done({});
      return;
    }

    if (!data || typeof data !== "object") {
      console.log(TAG + " Unexpected response");
      $done({});
      return;
    }

    const result = data.result;

    if (result && typeof result === "object") {
      const licenses = result.licenses;

      console.log(
        TAG + " Licenses: " +
        (Array.isArray(licenses) ? licenses.length : 0)
      );
    }

    console.log(TAG + " Response processed");
    $done({ body: JSON.stringify(data) });

  } catch (error) {
    console.log(TAG + " Error: " + error.message);
    $done({});
  }
})();
