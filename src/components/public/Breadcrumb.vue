<template>
    <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>{{options.name}}</BreadcrumbItem>
                <BreadcrumbItem>{{options.branch}}</BreadcrumbItem>
    </Breadcrumb>
</template>
<script>
export default {
    props:['options']
}
</script>
<style lang="less" scoped>

</style>bbb