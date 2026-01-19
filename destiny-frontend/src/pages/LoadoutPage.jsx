import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getIconUrl } from "../services/bungieApi"
import { getItemName } from "../services/bungieApi"

function LoadoutPage() {
    // Access character data passed from previous page
    const location = useLocation()
    const characterData = location.state?.characterData

    // Store equipped weapon and armor data
    const [weapons, setWeapons] = useState([])
    const [armor, setArmor] = useState([])

    // Track which item is currently selected (by instance ID)
    const [selectedItemId, setSelectedItemId] = useState("")
    
    // Store subclass item data
    const[subclass, setSubclass] = useState(null);

    // Mapping damage type numbers to readable names
    const DAMAGE_TYPES = {
        0: "None",
        1: "Kinetic",
        2: "Arc",
        3: "Solar",
        4: "Void",
        5: "Raid",
        6: "Stasis",
        7: "Strand"
    }

    // Fetch equipped items when character data becomes available
    useEffect(() => {
        if (characterData) {
            fetchEquippedItems()
        }
    }, [characterData])

    // Fetch equipped weapons and armor and store them as plain objects
    async function fetchEquippedItems() {
        const items = characterData.Response.equipment.data.items

        const weaponList = []
        const armorList = []

        // Loop through all equipped items
        for (let i = 0; i < items.length; i++) {
            const { itemHash, itemInstanceId } = items[i]

            // Fetch icon path using item hash
            const iconPath = await getIconUrl(itemHash)

            // Fetch item name using item hash
            const name = await getItemName(itemHash)

            // Store item data (hash, instance ID, and icon URL)
            const item = {
                itemHash,
                itemInstanceId,
                iconUrl: `https://www.bungie.net${iconPath}`,
                itemName: name
            }

            // Subclass item is at index 11
            if (i == 11) {
                setSubclass(item);
            }
            // First 3 items are weapons, remaining are armor
            if (i < 3) {
                weaponList.push(item)
            } else {
                armorList.push(item)
            }
        }

        // Save data to state (triggers re-render)
        setWeapons(weaponList)
        setArmor(armorList)
    }

    // Render detailed item info box for a selected item
    function renderItemInfo(itemInstanceId, itemName) {
        // Lookup instance-specific data using instance ID
        const instanceData =
            characterData.Response.itemComponents.instances.data[itemInstanceId]

        if (!instanceData) {
            return null
        }

        const damageType =
            DAMAGE_TYPES[instanceData.damageType] ?? "None"

        const powerLevel =
            instanceData.primaryStat?.value ?? "—"

        return (
            <div
                style={{
                    position: "absolute",
                    top: "0",
                    left: "110px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "8px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    width: "160px",
                    zIndex: 10
                }}
            >
                <div>
                    <p style={{
                        fontSize:"25px",
                        margin: "0px"}}>
                            {itemName}
                    </p>
                </div>
                <div><strong>Damage:</strong> {damageType}</div>
                <div><strong>Power:</strong> {powerLevel}</div>
            </div>
        )
    }

    // Render a single weapon or armor item
    function renderItem(item) {
        return (
            <div
                key={item.itemInstanceId}
                style={{
                    position: "relative",
                    marginBottom: "20px",
                    cursor: "pointer"
                }}
                // Toggle item info box on click
                onClick={() =>
                    setSelectedItemId(
                        selectedItemId === item.itemInstanceId
                            ? ""
                            : item.itemInstanceId
                    )
                }
            >
                <img
                    src={item.iconUrl}
                    alt=""
                    width={100}
                    height={100}
                />

                {/* Show item info only if this item is selected */}
                {selectedItemId === item.itemInstanceId &&
                    renderItemInfo(item.itemInstanceId, item.itemName)}
            </div>
        )
    }

    return (
        <div
            style={{
                backgroundColor: "#1c1a2e",
                color: "white",
                minHeight: "100vh",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <h2>Character Loadout</h2>

            <div style={{
                paddingBottom:"5px",
                paddingTop:"30px"
            }}>
                {subclass && renderItem(subclass)}
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "300px",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
                {/* Weapons column */}
                <div style={{ textAlign: "center" }}>
                    <h3>Weapons</h3>
                    {weapons.map(renderItem)}
                </div>

                {/* Armor column */}
                <div style={{ textAlign: "center" }}>
                    <h3>Armor</h3>
                    {armor.map(renderItem)}
                </div>
            </div>
        </div>
    )
}

export default LoadoutPage
