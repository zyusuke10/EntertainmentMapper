import requests
import math

# 現在地から近いスポットを表示する
def SearchNearBySpot(spots):
    geo_data = UserCurrentLocation()
    spot_and_distances = SpotsDistancesList(float(geo_data['latitude']), float(geo_data['longitude']), spots)
    spots_and_distances_sort_by_distance = sorted(spot_and_distances, key=lambda s: s.distance)
    spots_sort_by_distance = []
    for i in range(20):
        if i >= len(spots_and_distances_sort_by_distance):
            break
        else:
            spots_sort_by_distance.append(spots_and_distances_sort_by_distance[i].spot)
    return spots_sort_by_distance
# ユーザーの現在地を取得
def UserCurrentLocation():
    geo_request_url = 'https://get.geojs.io/v1/ip/geo.json'
    geo_data = requests.get(geo_request_url).json()
    return geo_data
# 距離の計算値のリスト
def SpotsDistancesList(lat, lon, spots):
    list = []
    for spot in spots:
        dis = cal_distance(lat,lon, spot.latitude, spot.longitude)
        spot_and_distance = SpotAndDistance(spot, dis)
        list.append(spot_and_distance)
    return list
# スポットとスポットまでの距離の情報
class SpotAndDistance:
    def __init__(self, spot, distance):
        self.spot = spot
        self.distance = distance

# 2地点の距離の計算(km)
pole_radius = 6356752.314245                  # 極半径
equator_radius = 6378137.0                    # 赤道半径
latlon_kamata = (35.562479, 139.716073)       # 蒲田駅の緯度経度
latlon_yokosukachuo = (35.278699, 139.670040) # 横須賀中央駅の緯度経度
def cal_distance(lat1, lon1, lat2, lon2):

    # 緯度経度をラジアンに変換
    lat1r = math.radians(lat1)
    lon1r = math.radians(lon1)
    lat2r = math.radians(lat2)
    lon2r = math.radians(lon2)

    lat_difference = lat1r - lat2r       # 緯度差
    lon_difference = lon1r - lon2r       # 経度差
    lat_average = (lat1r + lat2r) / 2    # 平均緯度

    e2 = (math.pow(equator_radius, 2) - math.pow(pole_radius, 2)) \
            / math.pow(equator_radius, 2)  # 第一離心率^2

    w = math.sqrt(1- e2 * math.pow(math.sin(lat_average), 2))

    m = equator_radius * (1 - e2) / math.pow(w, 3) # 子午線曲率半径

    n = equator_radius / w                         # 卯酉線曲半径

    distance = math.sqrt(math.pow(m * lat_difference, 2) \
                   + math.pow(n * lon_difference * math.cos(lat_average), 2)) # 距離計測

    return distance / 1000